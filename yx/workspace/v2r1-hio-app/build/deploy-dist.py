# import os,os.path,sys
# import zipfile
 
# def zip_dir(dirname,zipfilename):
#     filelist = []
#     if os.path.isfile(dirname):
#         filelist.append(dirname)
#     else :
#         for root, dirs, files in os.walk(dirname):
#             for name in files:
#                 filelist.append(os.path.join(root, name))
          
#     zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
#     for tar in filelist:
#         arcname = tar[len(dirname):]
#         #print arcname
#         zf.write(tar,arcname)
#     zf.close()
  
  
# def unzip_file(zipfilename, unziptodir):
#     if not os.path.exists(unziptodir): os.mkdir(unziptodir)
#     zfobj = zipfile.ZipFile(zipfilename)
#     for name in zfobj.namelist():
#         name = name.replace('\\','/')
         
#         if name.endswith('/'):
#             os.mkdir(os.path.join(unziptodir, name))
#         else:            
#             ext_filename = os.path.join(unziptodir, name)
#             ext_dir= os.path.dirname(ext_filename)
#             if not os.path.exists(ext_dir) : os.mkdir(ext_dir)
#             outfile = open(ext_filename, 'wb')
#             outfile.write(zfobj.read(name))
#             outfile.close()
  
# if __name__ == '__main__':
#     print('starting zip dist folder,needs about 10 seconds above,please waiting...')
#     zip_dir(r'./dist',r'./dist.zip')







#!/usr/bin/python
# coding=utf-8

import paramiko
import os

def sftp_upload(host,port,username,password,local,remote):
    sf = paramiko.Transport((host,port))
    sf.connect(username = username,password = password)
    sftp = paramiko.SFTPClient.from_transport(sf)
    try:
        if os.path.isdir(local):#判断本地参数是目录还是文件
            for f in os.listdir(local):#遍历本地目录
                sftp.put(os.path.join(local+f),os.path.join(remote+f))#上传目录中的文件
        else:
            sftp.put(local,remote)#上传文件
    except e:
        print('upload exception:',e)
    sf.close()

if __name__ == '__main__':
    host = '192.168.3.57'#主机
    port = 22 #端口
    username = 'adminuser' #用户名
    password = '1qaz@WSX' #密码
    local = 'D:\\workspace\\v2r1-hio-app\\dist.zip'#本地文件或目录，与远程一致，当前为windows目录格式，window目录中间需要使用双斜线
    remote = '/home/adminuser/jzy-web/platform-app_dev_v2/'#远程文件或目录，与本地一致，当前为linux目录格式
    sftp_upload(host,port,username,password,local,remote)#上传

    
    #sftp_download(host,port,username,password,local,remote)#下载