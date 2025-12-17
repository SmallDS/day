import { NextResponse } from 'next/server';

const BING_API = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
const BING_BASE_URL = 'https://www.bing.com';

export const dynamic = 'force-dynamic'; // 确保不被静态化
export const runtime = 'edge'; // 使用边缘运行时，更快

export async function GET() {
    try {
        // 1. 获取必应壁纸信息
        const response = await fetch(BING_API, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            console.error('Bing API response not ok:', response.status);
            return NextResponse.json(
                { error: 'Failed to fetch Bing API', status: response.status },
                { status: 500 }
            );
        }

        const data = await response.json();

        if (!data.images || data.images.length === 0) {
            console.error('No images in Bing response:', data);
            return NextResponse.json(
                { error: 'No images available' },
                { status: 404 }
            );
        }

        // 2. 构建完整的壁纸 URL
        const imageUrl = BING_BASE_URL + data.images[0].url;
        console.log('Fetching image from:', imageUrl);

        // 3. 获取图片并返回
        const imageResponse = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!imageResponse.ok) {
            console.error('Image fetch failed:', imageResponse.status);
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: 500 }
            );
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Wallpaper API error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: String(error) },
            { status: 500 }
        );
    }
}
