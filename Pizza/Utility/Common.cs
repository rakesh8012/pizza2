using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Pizza.Utility
{
    public class Common
    {
        public const string Const_CryptographyKey = "TFhOiRsaipslsieccautriiotny";
        #region Encryption and Decryption with AES
        /// <summary>
        ///Method to Encrypt Normal password string in to encrypted format
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public string Encrypt(string input)
        {
            try
            {
                // Get the bytes of the string
                byte[] bytesToBeEncrypted = Encoding.UTF8.GetBytes(input);
                byte[] cryptoKeyBytes = Encoding.UTF8.GetBytes(Const_CryptographyKey);

                // Hash the cryptoKey with SHA256
                cryptoKeyBytes = SHA256.Create().ComputeHash(cryptoKeyBytes);

                byte[] encryptedBytes = null;

                // Set your salt here, change it to meet your flavor:
                // The salt bytes must be at least 8 bytes.
                byte[] saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

                using (MemoryStream ms = new MemoryStream())
                {
                    using (AesCryptoServiceProvider AES = new AesCryptoServiceProvider())
                    {
                        AES.KeySize = 256;
                        AES.BlockSize = 128;

                        var key = new Rfc2898DeriveBytes(cryptoKeyBytes, saltBytes, 1000);
                        AES.Key = key.GetBytes(AES.KeySize / 8);
                        AES.IV = key.GetBytes(AES.BlockSize / 8);

                        AES.Mode = CipherMode.CBC;

                        using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                            cs.Close();
                        }
                        encryptedBytes = ms.ToArray();
                    }
                }

                string result = Convert.ToBase64String(encryptedBytes).Replace("/", "_").Replace("+", "-");
                return result;
            }
            catch (Exception ex)
            {
                return "";
            }
        }


        /// <summary>
        ///Method Decrypts the Encrypted in to normal string format
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public string Decrypt(string strValue)
        {
            try
            {
                if (!string.IsNullOrEmpty(strValue))
                {
                    strValue = strValue.Replace("_", "/").Replace("-", "+");

                    // Get the bytes of the string
                    byte[] bytesToBeDecrypted = Convert.FromBase64String(strValue);
                    byte[] passwordBytes = Encoding.UTF8.GetBytes(Const_CryptographyKey);
                    passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

                    byte[] decryptedBytes = null;

                    // Set your salt here, change it to meet your flavor:
                    // The salt bytes must be at least 8 bytes.
                    byte[] saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (AesCryptoServiceProvider AES = new AesCryptoServiceProvider())
                        {
                            AES.KeySize = 256;
                            AES.BlockSize = 128;

                            var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                            AES.Key = key.GetBytes(AES.KeySize / 8);
                            AES.IV = key.GetBytes(AES.BlockSize / 8);

                            AES.Mode = CipherMode.CBC;

                            using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                            {
                                cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                            }
                            decryptedBytes = ms.ToArray();
                        }
                    }

                    return Encoding.UTF8.GetString(decryptedBytes);
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        #endregion
    }


    public class Response
    {
        public Response()
        { }

        public Response(object _data, string _message, bool _status)
        { this.Data = _data; this.Message = _message; this.Status = _status; }

        public string Message { get; set; }
        public object Data { get; set; }
        public bool Status { get; set; }
    }
}