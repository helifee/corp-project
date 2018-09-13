package com.test.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class UploadAction extends ActionSupport
{
	private String username;

	private String password;

	private List<File> file;

	private List<String> fileFileName;

	private List<String> fileContentType;

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public List<File> getFile()
	{
		return file;
	}

	public void setFile(List<File> file)
	{
		this.file = file;
	}

	public List<String> getFileFileName()
	{
		return fileFileName;
	}

	public void setFileFileName(List<String> fileFileName)
	{
		this.fileFileName = fileFileName;
	}

	public List<String> getFileContentType()
	{
		return fileContentType;
	}

	public void setFileContentType(List<String> fileContentType)
	{
		this.fileContentType = fileContentType;
	}

	@Override
	public String execute() throws Exception
	{
		for (int i = 0; i < file.size(); ++i)
		{
			InputStream is = new FileInputStream(file.get(i));

			String root = ServletActionContext.getRequest().getRealPath(
					"/upload");

			File destFile = new File(root, this.getFileFileName().get(i));

			OutputStream os = new FileOutputStream(destFile);

			byte[] buffer = new byte[400];

			int length = 0;

			while ((length = is.read(buffer)) > 0)
			{
				os.write(buffer, 0, length);
			}

			is.close();

			os.close();
		}

		return SUCCESS;

	}

}
