using System;
using System.Collections.Generic;
using System.Text;
using System.IO.Compression;
using System.IO;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    /// 利用GzipStream进行压缩和解压
    /// </summary>
    public class GZipUtil
    {
        private static GZipStream gZipStream = null;
        /// <summary>
        /// 压缩
        /// </summary>
        /// <param name="srcBytes"></param>
        /// <returns></returns>
        public static byte[] Compress(byte[] srcBytes)
        {
            MemoryStream ms = new MemoryStream(srcBytes);
            gZipStream = new GZipStream(ms, CompressionMode.Compress);
            gZipStream.Write(srcBytes, 0, srcBytes.Length);
            gZipStream.Close();
            return ms.ToArray();
        }
        /// <summary>
        /// 解压
        /// </summary>
        /// <param name="srcBytes"></param>
        /// <returns></returns>
        public static byte[] Decompress(byte[] buffer)
        {
            MemoryStream ms = new MemoryStream();
            gZipStream = new GZipStream(ms, CompressionMode.Decompress,true);
            gZipStream.Write(buffer, 0, buffer.Length);
            gZipStream.Close();
            //MemoryStream ms = new MemoryStream();
            //byte[] buffer = new byte[40960];
            //int n;
            //while ((n = gZipStream.Read(buffer, 0, buffer.Length)) > 0)
            //{
            //    ms.Write(buffer, 0, n);
            //}
            //gZipStream.Close();
            ms.Position = 0;
            GZipStream zipStream = new GZipStream(ms, CompressionMode.Decompress);
            Console.WriteLine("Decompression");
            byte[] decompressedBuffer = new byte[buffer.Length + 100];
            // Use the ReadAllBytesFromStream to read the stream.
            int totalCount = ReadAllBytesFromStream(zipStream, decompressedBuffer);
            Console.WriteLine("Decompressed {0} bytes", totalCount);

            if (!CompareData(buffer, buffer.Length, decompressedBuffer, totalCount))
            {
                Console.WriteLine("Error. The two buffers did not compare.");
            }
            zipStream.Close();


            return decompressedBuffer;
        }

        /// <summary>
        /// 将指定的字节数组压缩,并写入到目标文件
        /// </summary>
        /// <param name="srcBuffer">指定的源字节数组</param>
        /// <param name="destFile">指定的目标文件</param>
        public static void CompressData(byte[] srcBuffer, string destFile)
        {
            FileStream destStream = null;
            GZipStream compressedStream = null;
            try
            {
                //打开文件流
                destStream = new FileStream(destFile, FileMode.OpenOrCreate, FileAccess.Write);
                //指定压缩的目的流（这里是文件流）
                compressedStream = new GZipStream(destStream, CompressionMode.Compress, true);
                //往目的流中写数据，而流将数据写到指定的文件
                compressedStream.Write(srcBuffer, 0, srcBuffer.Length);
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("压缩数据写入文件{0}时发生错误", destFile), ex);
            }
            finally
            {
                // Make sure we allways close all streams               
                if (null != compressedStream)
                {
                    compressedStream.Close();
                    compressedStream.Dispose();
                }

                if (null != destStream)
                    destStream.Close();
            }
        }
        /// <summary>
        /// 将指定的文件解压,返回解压后的数据
        /// </summary>
        /// <param name="srcFile">指定的源文件</param>
        /// <returns>解压后得到的数据</returns>
        public static byte[] DecompressData(string srcFile)
        {
            if (false == File.Exists(srcFile))
                throw new FileNotFoundException(String.Format("找不到指定的文件{0}", srcFile));
            FileStream sourceStream = null;
            GZipStream decompressedStream = null;
            byte[] quartetBuffer = null;
            try
            {
                sourceStream = new FileStream(srcFile, FileMode.Open, FileAccess.Read, FileShare.Read);
                decompressedStream = new GZipStream(sourceStream, CompressionMode.Decompress, true);
                // Read the footer to determine the length of the destiantion file
                //GZIP文件格式说明:
                //10字节的头，包含幻数、版本号以及时间戳 
                //可选的扩展头，如原文件名 
                //文件体，包括DEFLATE压缩的数据 
                //8字节的尾注，包括CRC-32校验和以及未压缩的原始数据长度(4字节) 文件大小不超过4G 

                //为Data指定byte的长度，故意开大byte数据的范围
                //读取未压缩的原始数据长度
                quartetBuffer = new byte[4];
                long position = sourceStream.Length - 4;
                sourceStream.Position = position;
                sourceStream.Read(quartetBuffer, 0, 4);

                int checkLength = BitConverter.ToInt32(quartetBuffer, 0);
                byte[] data;
                if (checkLength <= sourceStream.Length)
                {
                   data = new byte[Int16.MaxValue];
                }
                else
                {
                   data = new byte[checkLength + 100];
                }
                //每100byte从解压流中读出数据，并将读出的数据Copy到Data byte[]中，这样就完成了对数据的解压
                byte[] buffer = new byte[100];
                sourceStream.Position = 0;

                int offset = 0;
                int total = 0;

                while (true)
                {
                    int bytesRead = decompressedStream.Read(buffer, 0, 100);

                    if (bytesRead == 0)
                        break;

                    buffer.CopyTo(data, offset);

                    offset += bytesRead;
                    total += bytesRead;
                }
                //剔除多余的byte
                byte[] actualdata = new byte[total];

                for (int i = 0; i < total; i++)
                    actualdata[i] = data[i];

                return actualdata;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("从文件{0}解压数据时发生错误", srcFile), ex);
            }
            finally
            {
                if (sourceStream != null)
                    sourceStream.Close();

                if (decompressedStream != null)
                    decompressedStream.Close();
            }
        }



        public static int ReadAllBytesFromStream(Stream stream, byte[] buffer)
        {
            // Use this method is used to read all bytes from a stream.
            int offset = 0;
            int totalCount = 0;
            while (true)
            {
                int bytesRead = stream.Read(buffer, offset, 100);
                if (bytesRead == 0)
                {
                    break;
                }
                offset += bytesRead;
                totalCount += bytesRead;
            }
            return totalCount;
        }

        public static bool CompareData(byte[] buf1, int len1, byte[] buf2, int len2)
        {
            // Use this method to compare data from two different buffers.
            if (len1 != len2)
            {
                Console.WriteLine("Number of bytes in two buffer are different {0}:{1}", len1, len2);
                return false;
            }

            for (int i = 0; i < len1; i++)
            {
                if (buf1[i] != buf2[i])
                {
                    Console.WriteLine("byte {0} is different {1}|{2}", i, buf1[i], buf2[i]);
                    return false;
                }
            }
            Console.WriteLine("All bytes compare.");
            return true;
        }


    }
}
