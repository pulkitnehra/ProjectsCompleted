## Algorithm and Flow process of Hotel
Management System Project.

1. Start
2. Create a Java Project
3. Create the mian class named as HotelManagementSystem that extends JFrame
implements ActionListener and add buttons login.

4. Create a database in Mysql name projecthms. Clear instructions to install and create
database and tables is given in the dbtables.txt file.

5. Import the following files -import com.mysql.jdbc.PreparedStatement;
import java.awt.Color; import java.awt.event.KeyAdapter; import
java.awt.event.KeyEvent; import java.sql.Connection; import
java.sql.DriverManager; import java.sql.ResultSet; import java.sql.SQLException;
import java.sql.Statement; import javax.swing.JOptionPane; import
javax.swing.table.DefaultTableModel;

6. Create a Login class that extends JFrame, add text label and password label to the
JFrame and two-button Login.

7. Enter the user name “admin” and password “password” to click the login button to
confirm access.

8. Create a class connection add declare a variable connect with data type Connection
creates a connection by using “com.mysql.jdbc.Driver" now Connection the code
with database using Driver Manger using the followingstring
"jdbc:mysql://localhost/projecthms","root","password";

9. Create a class mainmenu that extends JFrame, Add the following buttons to the
JFrame that has buttons HotelMangement and admin and logout, where hotel
management button calls reception class and admin button calls administration
class.

10. Now create a administration class that has Add Employee and Add Room and back
buttons. Add Employee button calls addEmployee class and Add Room button calls
addRoom class.

11. Now create AddEmployee Class that contains input fields where the employee data
can be given as an input and then using a button submit stores the data of the
employee in the MySQL database in table called “employee” using JDBC connect.
Same thing for the AddRoom, the input details of the room will be stored in the
MySQL database in the table “room” using JDBC connect, inside the
ActionPerformed block.

12. Once the valid details entered the button submit stores the details in the database
and returns to the previous class Frame. Or by clicking the Back will return to the
previous class file.

13. Now in the HotelManagement in the main menu, the action performed by this
button will lead to hotel reception where, New customer form , room, all employee
info, customer info, manager info, checkout, update check status, update room
status and main menu buttons exist. using these buttons will lead to respective class
file.

14. Now New Customer Form button will lead to Customer form class where the details
of a new customer can be added and then step 12 will be performed.

15. Now Room button will lead to room class file that will display all the rooms in the
form of a table and the button Load data will refresh if any changes are updated in
the database. And the button Back will take back to the reception screen.
16. Now all employee info button will lead to employee info class file that will display all
the employees in the form of a table and the button Load data will refresh if any
changes are updated in the database. And the button Back will take back to the
reception screen.

17. Now Customer info button will lead to employee info class file that will display all the
customers in the form of a table and the button Load data will refresh if any changes
are updated in the database. And the button Back will take back to the reception
screen.
18. Now manager info button will lead to employee info class file that will display all the
managers in the form of a table and the button Load data will refresh if any changes
are updated in the database. And the button Back will take back to the reception
screen
19. The Check out button will lead to check out class where there exists a choice box
which displays all the checked in customer id’s and once selected there’s an image
button that will show the corresponding room number in the below text field. With
help of the button Check Out, once action is performed the details of the customers
will be removed from the checked in table and room will be Available for other
customers. And reception class will be visible. Or with the Back button, the action
can take back to the reception frame.

20. The Update Check status button will lead to checkin class where there exists a choice
box which displays all the checked in customer id’s and once selected there’s an
check button that will show the corresponding details of the customer in the below
text fields. And the amount paid and the pending amount can be seen and adjusted
here. Once everything is done the button update will update the details in the
database and will return the reception frame. Or with the Back button, the action
can take back to the reception frame.

21. The Update room status button will lead to rom class where there exists a choice box
which displays all the checked in customer id’s and once selected there’s an check
button that will show the corresponding details of the customer in the below text
fields. And the room cleaning status and the availability can be seen and adjusted
here. Once everything is done the button update will update the details in the
database and will return the reception frame. Or with the Back button, the action
can take back to the reception frame.

22. Finally, there exists a button Main Menu, the action performed by this will take back
to the main menu frame.
A clear input and output detail is given in the input and the output document file.
