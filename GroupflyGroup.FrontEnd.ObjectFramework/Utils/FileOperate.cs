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
    public class FileOperate
    {
        /// <summary>
        /// Files the content.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static byte[] FileContent(string fileName)
        {
            FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            try
            {
                byte[] buffur = new byte[fs.Length];
                fs.Read(buffur, 0, (int)fs.Length);
                return buffur;
            }
            catch (Exception ex)
            {
                //MessageBoxHelper.ShowPrompt(ex.Message);
                return null;
            }
            finally
            {
                if (fs != null)
                {
                    //关闭资源
                    fs.Close();
                }
            }
        }

        public static byte[] ReadFile(string fileName)
        {
            FileStream pFileStream = null;
            byte[] pReadByte = new byte[0];
            try
            {
                pFileStream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
                BinaryReader r = new BinaryReader(pFileStream);
                r.BaseStream.Seek(0, SeekOrigin.Begin);    //将文件指针设置到文件开
                pReadByte = r.ReadBytes((int)r.BaseStream.Length);
                return pReadByte;
            }
            catch
            {
                return pReadByte;
            }
            finally
            {

                if (pFileStream != null)
                    pFileStream.Close();
            }
        }

        //写byte[]到fileName

        public static bool writeFile(byte[] pReadByte, string fileName)
        {
            FileStream pFileStream = null;
            try
            {
                pFileStream = new FileStream(fileName, FileMode.OpenOrCreate);
                pFileStream.Write(pReadByte, 0, pReadByte.Length);
            }
            catch
            {

                return false;
            }
            finally
            {
                if (pFileStream != null)
                    pFileStream.Close();
            }
            return true;
        }

    }
}
