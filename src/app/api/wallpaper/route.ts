import { NextResponse } from 'next/server';

const BING_API = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
const BING_BASE_URL = 'https://www.bing.com';

export async function GET() {
    try {
        // 1. 获取必应壁纸信息
        const response = await fetch(BING_API, {
            next: { revalidate: 3600 } // 缓存1小时
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Bing API' },
                { status: 500 }
            );
        }

        const data = await response.json();

        if (!data.images || data.images.length === 0) {
            return NextResponse.json(
                { error: 'No images available' },
                { status: 404 }
            );
        }

        // 2. 构建完整的壁纸 URL
        const imageUrl = BING_BASE_URL + data.images[0].url;

        // 3. 获取图片并返回
        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
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
                'Cache-Control': 'public, max-age=3600', // 缓存1小时
            },
        });
    } catch (error) {
        console.error('Wallpaper API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
