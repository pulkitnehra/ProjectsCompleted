/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hotelmanagementsystem.main;
import java.sql.*;  

public class conn{
    Connection c;
    Statement s;
    public conn(){  
        try{  
        	System.out.println("establishing connection...");
            c =DriverManager.getConnection("jdbc:mysql://localhost:3306/hms","root","y50123"); 
            System.out.println("Conection established");
            s =c.createStatement();  
            
           
        }catch(Exception e){ 
            System.out.println(e);
        }  
    }  
    public static void main(String[] args) {
		new conn();
	}
}  

