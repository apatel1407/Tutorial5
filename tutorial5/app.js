const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;

//Path to users.json file stored in a variable.
const filePath = './users.json';

app.use(bodyParser.json());

/**
 * Description of method: Reading file using "fs" built in function.
 * 
 * Reference:
 * Author: Joseph Mawa
 * URL: https://blog.logrocket.com/reading-writing-json-files-node-js-complete-tutorial/
 * Date accessed: 10 March 2024
 * Description of usage: Accessed the link to understand how to read/ write to file in javascript.
 * 
 * @returns JSON Data
 */
function readFile(){
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
}

/**
 * Description of method: Writing file using "fs" built in function.
 * 
 * Reference:
 * Author: Joseph Mawa
 * URL: https://blog.logrocket.com/reading-writing-json-files-node-js-complete-tutorial/
 * Date accessed: 10 March 2024
 * Description of usage: Accessed the link to understand how to read/ write to file in javascript.
 * 
 * @param userList: List of the user 
 */
function writeToFile(userList){
    try {
        fs.writeFileSync(filePath, JSON.stringify(userList, null, 2));
    } catch (error) {
        console.error("Error writing users data to file:", error);
    }
}

//Get API for fetching and displaying user data.
app.get('/users', (req, res) => {
    try{
        const userList = readFile();

        //Checking if file contains any data or else return error status 404
        if(userList.length === 0){
            return res.status(404).json({
                message: "File is empty",
                success: false
            });
        }

        //If file contains data then status is updated to 200 and data is displayed along with a message.
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: readFile()
        });
    }catch(error){
        console.error("Error occurred:", error);

        //Server error
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
});

//Post API for adding new user
app.post('/add', (req, res) => {
    try{
        const userList = readFile();

        //Getting the email, firstname params from the request.
        const email = req.body.email;
        const firstName = req.body.firstName;

        //Calculating the number of users in the list
        let lengthOfUserList = userList.length;

        //If email or firstname is missing in the params then error message is displayed.
        if (!email || !firstName) {
            return res.status(404).json({
                message: "Email and firstName are required",
                success: false
            });
        }

        //Storing the increemented id, new email, new password to newAddedUser variable.
        const newAddedUser = {
            id: (lengthOfUserList + 1).toString(),
            email: email,
            firstName: firstName
        };
        userList.push(newAddedUser)

        //Adding the new user to the file by pushing it to the userList.
        writeToFile(userList);

        //Success message.
        res.status(200).json({
            message: "User added",
            success: true
        });
    }catch(error){
        console.error("Error occurred:", error);

        //Server error
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
    
});

//PUT api for updating user based on ID
app.put('/update/:id', (req, res) => {
    try{
        const userList = readFile();

        //Checking if file contains any data or else return error status 404
        if(userList.length === 0){
            return res.status(404).json({
                message: "File is empty",
                success: false
            });
        }

        //Getting id from the url link.
        const userId = req.params.id;

        //Getting the email and firstname from request body.
        const email = req.body.email;
        const firstName = req.body.firstName;

        //Checking if the user is there in the userlist or not based on userId
        const index = userList.findIndex(userList => userList.id === userId);

        if (index !== -1) {
            //Updating the email and firstname based on the new values.
            if (email) userList[index].email = email;
            if (firstName) userList[index].firstName = firstName;

            //Writing the updated user to the list.
            writeToFile(userList);

            //Success message
            return res.status(200).json({
                message: "User updated",
                success: true
            });
        }

        //Success message
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }catch(error){
        console.error("Error occurred:", error);
        //Server error
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
    
});

//GET api for fetching a specific user based on username.
app.get('/user/:username', (req, res) => {
    const userList = readFile();
    try {
        //Fetching username from url.
        const username = req.params.username;

        //Searching for the user from the userList based on the username.
        const user = userList.find(userList => userList.firstName === username);

        //If not found show error message.
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //If found, display the user and success message
        return res.status(200).json({
            message: "User found",
            success: true,
            user: user
        });

    } catch (error) {
        console.error("Error occurred:", error);
        //Server error
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
