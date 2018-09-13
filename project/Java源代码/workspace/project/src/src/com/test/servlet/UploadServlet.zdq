package com.test.servlet;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadServlet extends HttpServlet
{

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		DiskFileItemFactory factory = new DiskFileItemFactory();

		String path = request.getRealPath("/upload");

		factory.setRepository(new File(path));

		factory.setSizeThreshold(1024 * 1024);

		ServletFileUpload upload = new ServletFileUpload(factory);

		try
		{
			List<FileItem> list = upload.parseRequest(request);

			for (FileItem item : list)
			{
				if (item.isFormField())
				{
					String name = item.getFieldName();

					String value = item.getString("gbk");

					System.out.println(name);

					request.setAttribute(name, value);
				}
				else
				{
					String name = item.getFieldName();

					String value = item.getName();

					int start = value.lastIndexOf("\\");

					String fileName = value.substring(start + 1);

					request.setAttribute(name, fileName);
					
					
					item.write(new File(path,fileName));
					

//					OutputStream os = new FileOutputStream(new File(path,
//							fileName));
//
//					InputStream is = item.getInputStream();
//
//					byte[] buffer = new byte[400];
//
//					int length = 0;
//
//					while ((length = is.read(buffer)) > 0)
//					{
//						os.write(buffer, 0, length);
//					}
//
//					os.close();
//
//					is.close();

				}
			}

		}

		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		request.getRequestDispatcher("upload/result2.jsp").forward(request,
				response);

	}

}
