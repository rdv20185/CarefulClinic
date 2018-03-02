package com.careful.clinic.rs.sp3.expertise;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import com.careful.clinic.dao.sp3.expertise.ISp3ExpertiseDao;
import com.careful.clinic.model.ListExcelFiles;
import com.careful.clinic.model.Wrap3a_b_Expertise;
import com.careful.clinic.report.sp3.expertise.Sp3ExpertiseReport;

import net.sf.jasperreports.engine.JRException;

@javax.ws.rs.Path("/sp3/expertise")
public class RestServiceSp3Experise {
	
	@EJB
	ISp3ExpertiseDao sp3ExpertiseDAO;
	@EJB
	Sp3ExpertiseReport sp3ExpertiseReport;
	
	
	@GET
	@Path("/Sp3ReportExpertiseFiles/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<?> listFilesExpertiseReport(@PathParam("id") Integer id) throws ParserConfigurationException, SAXException, IOException, ParseException {
		
		List<?> df = (List<?>) sp3ExpertiseDAO.getListExperiseReport(id);
		
		return df;
	}
	
	@POST
	@Path("/3a_report")
	//@Consumes("application/x-www-form-urlencoded")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response listFilesBrowser(String x)  {
		
		Response.ResponseBuilder builder = null;
		String m[] = x.split("\":\"");
		String user = Integer.parseInt(m[3].substring(0, 3).replaceAll("[\\D]", ""))+"";
		try{
			String date1 = m[1].substring(0, 10).substring(6,10)+m[1].substring(0, 10).substring(3,5);
			String date2 = m[2].substring(0, 10).substring(6,10)+m[2].substring(0, 10).substring(3,5);
			List<Wrap3a_b_Expertise> ls = null;
			// смещение для запроса
			int iter = 0;
			// порядковый номер файла
			int i =1;
			while(true){
				ls = (List<Wrap3a_b_Expertise>) sp3ExpertiseDAO.getResalt3a_expertise(date1, date2, user, iter);
				if (ls.size() != 0) sp3ExpertiseReport.executeJasperReport3aExpertise(ls, "_"+i, user, date1, date2);
				else break;
				
				i++;
				iter = iter + 60_000;
			}
			
			builder = Response.status(Response.Status.OK);
		     builder.entity("Отчет успещно сформирован");
		     //throw new Exception(); 
		     return builder.build();
		}catch (Exception e) {
			e.printStackTrace();
			builder = Response.status(Response.Status.OK);
		     builder.entity("Произошла ошибка формирования отчета");
		     return builder.build();
		}
	}
	
	
	@GET
	@Path("/downloadFile/{id}/{namefile}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/vnd.ms-excel")
	public Response getdownloadFile(@PathParam("id") Integer id, @PathParam("namefile") String namefile) {
		
		int current_year = Calendar.getInstance().get(Calendar.YEAR);
		
		String directoryServer = System.getProperty("jboss.home.dir");
		String directoryDestination = "";
			if(id == 777) directoryDestination = "\\content\\report\\sp3\\expert\\777";
			if(id == 1)	directoryDestination = "\\content\\report\\sp3\\expert\\1";
			if(id == 2)	directoryDestination = "\\content\\report\\sp3\\expert\\2";
			if(id == 4)	directoryDestination = "\\content\\report\\sp3\\expert\\4";	
		
		
		directoryDestination = directoryServer+directoryDestination+File.separator+namefile;
		
	    File file = new File(directoryDestination);
	    try {
	        String contentType = Files.probeContentType(file.toPath());
	        
	        Response.ResponseBuilder response = Response.ok(file);
	        response.header("Content-Disposition", "attachment; filename="+file.getName());
	        response.header("Content-Type", contentType);
	        response.header("Content-Length", file.length());
	        return response.build();
	    } catch (IOException e) {
	        e.printStackTrace();
	        return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
	    }
	}
	
	@POST
	@Path("/3a3b_report")
	//@Consumes("application/x-www-form-urlencoded")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response listFiles_Browser3a3b(String x)  {
		
		Response.ResponseBuilder builder = null;
		String m[] = x.split("\":\"");
		String user = Integer.parseInt(m[3].substring(0, 3).replaceAll("[\\D]", ""))+"";
		try{
			String date1 = m[1].substring(0, 10).substring(6,10)+m[1].substring(0, 10).substring(3,5);
			String date2 = m[2].substring(0, 10).substring(6,10)+m[2].substring(0, 10).substring(3,5);
			List<Wrap3a_b_Expertise> ls = null;
			// смещение для запроса
			int iter = 0;
			// порядковый номер файла
			int i =1;
			while(true){
				ls = (List<Wrap3a_b_Expertise>) sp3ExpertiseDAO.getResalt3a3b_expertise(date1, date2, user, iter);
				if (ls.size() != 0) sp3ExpertiseReport.executeJasperReport3a3bExpertise(ls, "_"+i, user, date1, date2);
				else break;
				
				i++;
				iter = iter + 60_000;
			}
			
			builder = Response.status(Response.Status.OK);
		     builder.entity("Отчет успещно сформирован");
		     //throw new Exception(); 
		     return builder.build();
		}catch (Exception e) {
			e.printStackTrace();
			builder = Response.status(Response.Status.OK);
		     builder.entity("Произошла ошибка формирования отчета");
		     return builder.build();
		}
	}
	
	
	@POST
	@Path("/3b_report")
	//@Consumes("application/x-www-form-urlencoded")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response listFiles_Browser(String x)  {
		
		Response.ResponseBuilder builder = null;
		String m[] = x.split("\":\"");
		String user = Integer.parseInt(m[3].substring(0, 3).replaceAll("[\\D]", ""))+"";
		try{
			String date1 = m[1].substring(0, 10).substring(6,10)+m[1].substring(0, 10).substring(3,5);
			String date2 = m[2].substring(0, 10).substring(6,10)+m[2].substring(0, 10).substring(3,5);
			List<Wrap3a_b_Expertise> ls = null;
			// смещение для запроса
			int iter = 0;
			// порядковый номер файла
			int i =1;
			while(true){
				ls = (List<Wrap3a_b_Expertise>) sp3ExpertiseDAO.getResalt3b_expertise(date1, date2, user, iter);
				if (ls.size() != 0) sp3ExpertiseReport.executeJasperReport3bExpertise(ls, "_"+i, user, date1, date2);
				else break;
				
				i++;
				iter = iter + 60_000;
			}
			
			builder = Response.status(Response.Status.OK);
		     builder.entity("Отчет успещно сформирован");
		     //throw new Exception(); 
		     return builder.build();
		}catch (Exception e) {
			e.printStackTrace();
			builder = Response.status(Response.Status.OK);
		     builder.entity("Произошла ошибка формирования отчета");
		     return builder.build();
		}
	}

}