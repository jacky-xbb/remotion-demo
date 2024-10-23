// import { NextResponse } from 'next/server';
// import { promises as fs } from 'fs';
// import path from 'path';

// export async function POST(request: Request) {
//   try {
//     const { audioFiles } = await request.json();

//     const audioBuffers = await Promise.all(
//       audioFiles.map(async (audio: string) => {
//         const filePath = path.join(process.cwd(), 'public', audio);
//         const fileBuffer = await fs.readFile(filePath);
//         return fileBuffer.toString('base64');
//       })
//     );

//     return NextResponse.json({ audioBuffers });
//   } catch (error) {
//     console.error('Error reading audio files:', error);
//     return NextResponse.json({ error: 'Error reading audio files' }, { status: 500 });
//   }
// }
