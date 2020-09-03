/////Generic Authorization and packages////
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot 
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
//outputs basic information about the bot to the console
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


//////Actual Code Starts Here \\\\\\

bot.on('guildMemberAdd', member =>{ // function is triggered when a member joins the server (server = Guild)
    var serverID = '645471732718764064'; //Stonks Society Server ID 
    var previously_joined = false; //set the verification variable to see if they've joined before to false 
    var i; // counting variable that will be used in a for loop later
   bot.on('message', function(user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
        if(userID==='689244487511310488'){
            if (message.substring(0, 1) == '!') {
                var args = message.substring(1).split(' ');
                var cmd = args[0];

                args = args.splice(1);
                switch (cmd) {
                    case 'cheat':
                        bot.sendMessage({
                            to:channelID,
                            message: 'CHEATERS ARE NOT WELCOME HERE'
                        })
                    break;
                }
            }
        }

        if(userID==='265313974784884737'){
            if (message.substring(0, 1) == '!') {
                var args = message.substring(1).split(' ');
                var cmd = args[0];

                args = args.splice(1);
                switch (cmd) {
                    // !ping
                    // checks if !ping was used
                    // example command from discord.io
                    case 'Pingg':
                        bot.sendMessage({
                            to: channelID,
                            message: 'Pong!'
                        });
                    break;

                    case 'GUH':
                        bot.sendMessage({
                            to:channelID,
                            message: '$APPL PUTS'
                        });
                    break;

                    case 'beep':
                        bot.sendMessage({
                            to: channelID,
                            message: 'boop!'
                        });
                    break;

                    case 'cheat':
                        bot.sendMessage({
                            to: channelID,
                            message: 'CHEATERS ARE NOT WELCOME HERE'
                        })
                    break;

                    case 'Kerchoo':
                        bot.sendMessage({
                            to:channelID,
                            message: 'bless you!'
                        })
                    break;

                }
            }
        }
        if(userID!=='265313974784884737'){
            if (message.substring(0, 1) == '!') {
                    var args = message.substring(1).split(' ');
                    var cmd = args[0];

                    args = args.splice(1);
                    switch (cmd) {
                        case'Pingg':
                            bot.sendMessage({
                                to:channelID,
                                message: 'I do not respond to scum like you'
                            })
                        break;
                    
                        case 'Kerchoo':
                        bot.sendMessage({
                            to:channelID,
                            message: 'bless you!'
                        })
                        break;
                }
            }
        }
    })


    bot.getMessages({ //a function that searches the last 100 messages in a given channel
        channelID: '744611191086645288', //leave-history channel ID
        limit: 100, //max number of messages that can be returned by this function
    },

    (errors, messageArray)=>{ //messageArray is the array of the 100 last messages returned by the getMessages function
        var memberNumber = member.discriminator; // the four digit ID number on discord
        var message; // the actual message sent to the channel
        var splitString; // splitting the message, first pass
        var secondSplit // splitting the message, second pass
        var ID_Number; // the four digit ID number found in the message 

        for (i=0; i<messageArray.length; i++){ // for loop that will go over each of the last 100 messages in the leave-history channel to check if a member's 4-digit number appears 
            message = messageArray[i]["content"]; // indexes into the messageArray and retrieves the actual message that was sent 
            console.log(message)
            try{

                splitString = message.split('#') // splits the message into a "before" and "after" the # symbol
                secondSplit = splitString[1].split(' ') //splits the remaining message on the spaces 
                ID_Number = secondSplit[0] // this is the specific location where the 4-digit user number is in the message. subject to change depending on how 
            }
            catch(err){
                    console.log(err)
                    console.log(member.username)
                    bot.sendMessage({
                        to:'265313974784884737',
                        message:''+member.username+'#'+ member.discriminator + ' tried to join Stonks Society, but something went wrong'
                    })
                break;
            }
          
            
            if (memberNumber===ID_Number){ //Checks if the person joining the server has joined the server before
                previously_joined = true; // if the member number from the person joining matches one found in the leave-history log, then previously_joined is set to true
            }
        }

        if(previously_joined===true){ //checks if the previously joined variable is true
            bot.addToRole({ // if the member has joined before, they are added to the Free-tier Trader role immediately
                serverID: serverID, // ther server ID (defined above on line 28)
                roleID: '743314248029044736', // the Role ID for the "Trader" Role
                userID: member.id // The unique string of numbers representing the user/member
                }, 
                (err) => { // if an error occurs, this will catch it
                    if(err) console.log(err); // the error is then written on the console for easier debugging
                });

            bot.sendMessage({ // built in method for sending messages to users
                to: member.id, // the users ID
                message: 'You have previously joined as a trial member. You will only have access to the free-section. Please view your membership options here if you are interestd in joining our community and enjoying the full benefits of our server: https://www.stonkssociety.com/memberships '
            })
        }

        else if(previously_joined===false){ // if none of the userID numbers in the leave-history channel match the joining member's 4-digit ID, then the following code executes
            var roleID = '645534484212744203'; //Trial Role ID

            bot.addToRole({ // adds the joining member to the Trial Member Role
                serverID: serverID, // Server ID as previously defined
                roleID: roleID, //the Role ID defined above (line 71)
                userID: member.id // the joining members' ID
                }, 
                (err) => { //if an error occurs, this will catch it
                    if(err) console.log(err); // the error is then written on the console for easier debugging
                }
            );

            //protocol for setting the start date of the trial membership
            var currentDate = new Date(); // this just gets a date object with day, month, year, hours, minutes, and seconds
            var day = currentDate.getDate(); // separates out just the Day
            var month = currentDate.getMonth() + 1; // separates out the month- you add one because the built-in months start at zero
            var year = currentDate.getFullYear(); // separates out the year
            var date_formatted = month + '/' + day + '/' + year;  // this puts it all together in a human-readable format since it's used in the welcome message
           
            // protocol for setting the end date of the trial membership
            var end_date = new Date(); // this just gets a date object with day, month, year, hours, minutes, and seconds
            end_date.setDate(end_date.getDate()+7); //this adds a wee (7 days) to the current date
            var end_day = end_date.getDate(); // day that the trial ends
            var end_month = end_date.getMonth()+ 1; // month that the trial ends
            var end_year =  end_date.getFullYear(); // year that the trial ends
            var formatted_end_date = end_month + '/' + end_day + '/' + end_year; //this puts it all together in a human-readable format since it's used in the welcome message
           
            console.dir(member); // dsiplays the members infor on the console 
            userID=member.id; //users ID
            bot.sendMessage({  // sends welcome message to the new member letting them know their trial has started, and when it will end
                to: member.id, // users ID
                message: 'Welcome to Stonks Society ' +member.username+ '! Thank you for joining :grinning:. \nYour 7-Day trial beginning on '+ date_formatted+' and ending on ' +formatted_end_date+ ' has been automatically activated. \nWith your free trial, you can access analyst alerts in the premium section, view nightly watchlists, charting, trade ideas, member plays, and more! After your 7 day trial ends, please visit the <#733543593914007634> channel if you would like to continue membership!\nPlease take a look at the <#689963918273282098>  section for an introduction to who we are. Then, react to the bottom message in the <#689963918273282098> channel to receive your @Trader role! \nFeel free to use #chatroom to talk! The <#645473548302811176> channel in the premium section is where we provide option alerts. Take your time exploring all the channels we have. If you have any questions, don\'t hesitate to ask :)'
            })
    
            var interval; // Initialize the interval variable that will serve as a count down 
            // using the set interval fucntion, runs the endFunc in 7 days (604800000 milliseconds)
            interval = setInterval(endTrialFunc, 604800000);
            //endFunc is the function that kicks the user from the sever after one week and 
            // sends a message to the user letting them know the trial period is over
            function endTrialFunc(){ 
                bot.addToRole({ // adds the joining member to the Trader role
                    serverID: serverID, //server ID defined above (stonks society server ID)
                    roleID: '743314248029044736', //Trader role ID
                    userID: member.id // User ID
                }, 
                (err) => { //if an error occurs, this will catch it
                    if(err) console.log(err); // the error is then written on the console for easier debugging
                });
                bot.removeFromRole({ // removes the user from the trial member role
                    serverID: serverID, // stonks society server ID
                    roleID: '645534484212744203', //Trial Memeber Role ID
                    userID: member.id // User ID
                }, 
                (err)=>{ //if an error occurs, this will catch it
                    if(err) console.log(err); // the error is then written on the console for easier debugging
                });
        
                bot.sendMessage({ // sends message to the user 
                    to:member.id, // user ID
                    message: 'Hey '+member.username+'! Looks like your trial period is over. We\'d love to have you as a member- join us today and let\'s take your portfolio to the moon! check out our memberships here: https://www.stonkssociety.com/memberships'
                })
                // This clears the one week interval variable which prevents the endFunc from
                // continually running every 7 days and spamming the user with messages from the bot
                // by doing this, the kick operation and message will only be executed and sent once respectively
                clearInterval(interval);
            };
    
            var msginactivity = false; // setting the message inactivity variable to false
            var rctninactivity= false; // setting the reaction inactivity variable to false
            var inactivity; // inactivity variable
            var confirm_inactivity; // variable for confirming true inactivity (message and reaction inactivity)
            var message_inactivity;
            var reaction_inactivity;

            var warn_msgInactive = false;
            var warn_reactInactive = false;
            var warn_msg_inactivity;
            var warn_react_inactivity;
            var warn_confirmInactive;

            bot.on('message', function warn_message (user, userID, message) {   //function is triggered whenever ANY message is sent on the server
                var role_count = 0
                if(userID === member.id){ // this filters it down to only see messages sent by the joining member
                    for (var j=0; j<member.roles.length; j++){
                        switch(member.roles[j]){
                            case '733836812996575242': //Diamond Membership
                                console.log('Diamond member, do not Kick')
                                role_count= role_count+1
                            break;

                            case '733836601591070733': //Gold Membership
                                console.log('Gold member, do not Kick')
                                role_count= role_count+1
                            break;

                            case '733836337878138931': //Bronze Membership
                                console.log('Bronze member, do not Kick')
                                role_count= role_count+1
                            break;

                            case '645534484212744203':
                                console.log('Trial Member')
                                role_count = role_count+1
                            break;

                            case '743314248029044736':
                                console.log('Trader Member')
                                role_count= role_count+1
                            break; 
                        }
                    }

                    if (role_count>1){
                        bot.removeFromRole({ // removes the user from the trial member role
                            serverID: serverID, // stonks society server ID
                            roleID: '645534484212744203', //Trial Memeber Role ID
                            userID: member.id // User ID
                        }, 
                        (err)=>{ //if an error occurs, this will catch it
                            if(err) console.log(err); // the error is then written on the console for easier debugging
                        })

                        bot.removeFromRole({ // removes the user from the trial member role
                            serverID: serverID, // stonks society server ID
                            roleID: '743314248029044736', //Trader Memeber Role ID
                            userID: member.id // User ID
                        }, 
                        (err)=>{ //if an error occurs, this will catch it
                            if(err) console.log(err); // the error is then written on the console for easier debugging
                        });
                    }

                    else if(member.roles[0] === '743314248029044736'){
                        clearTimeout(warn_msg_inactivity) // inactivity will keep looping every time a message is sent, but we put the clearTimeout function before the actual function                    
                        warn_msg_inactivity = setTimeout(warn_countdown, 1209600000) // we set a countdown timer for a certain number of milliseconds, in this case equal to 30 days
                        function warn_countdown(){ // if the 30 days pass, this funciton executes
                            warn_msgInactive = true; // if the 30 days pass, the message inactivity variable is set to True, indicating  user hasn't sent any new messages in the past 30 days  
                            console.log('warn_msgInactive'+warn_msgInactive);             
                            if(warn_msgInactive === true) { // this filters it down to only see messages sent by the joining member
                                clearTimeout(message_inactivity) // inactivity will keep looping every time a message is sent, but we put the clearTimeout function before the actual function          
                                message_inactivity = setTimeout(countdown, 604800000) // we set a countdown timer for a certain number of milliseconds, in this case equal to 30 days
                                function countdown(){ // if the 30 days pass, this funciton executes
                                    msginactivity = true;// if the 30 days pass, the message inactivity variable is set to True, indicating  user hasn't sent any new messages in the past 30 days  
                                    console.log('msginactivity'+ msginactivity);
                                }     
                            }
                        }
                    }   
                }           
            })

            bot.on("messageReactionAdd", function warn_react (reaction, user) { // function is triggered whenever ANY reaction is added on the server
                role_counter = 0
                if(userID === member.id){ // this filters it down to just the reactions added by the joining member
                    for (var m=0; m<member.roles.length; m++){
                        switch(member.roles[m]){
                            case '733836812996575242': //Diamond Membership
                                console.log('Diamond member, do not Kick')
                                role_counter = role_counter+1
                            break;

                            case '733836601591070733': //Gold Membership
                                console.log('Gold member, do not Kick')
                                role_counter = role_counter+1
                            break;

                            case '733836337878138931': //Bronze Membership
                                console.log('Bronze member, do not Kick')
                                role_counter = role_counter+1
                            break;

                            case '645534484212744203':
                                console.log('Trial Member')
                                role_counter = role_counter+1
                            break;

                            case '743314248029044736':
                                console.log('Trader Member')
                                role_counter = role_counter+1
                            break; 
                        }
                    }
                    
                    if (role_counter>1){
                        bot.removeFromRole({ // removes the user from the trial member role
                            serverID: serverID, // stonks society server ID
                            roleID: '645534484212744203', //purgatory Memeber Role ID
                            userID: member.id // User ID
                        }, 
                        (err)=>{ //if an error occurs, this will catch it
                            if(err) console.log(err); // the error is then written on the console for easier debugging
                        })

                        bot.removeFromRole({ // removes the user from the trial member role
                            serverID: serverID, // stonks society server ID
                            roleID: '743314248029044736', //Trader Memeber Role ID
                            userID: member.id // User ID
                        }, 
                        (err)=>{ //if an error occurs, this will catch it
                            if(err) console.log(err); // the error is then written on the console for easier debugging
                        });
                    }

                    else if(member.roles[0] === '743314248029044736'){
                        clearTimeout(warn_react_inactivity) // refer to lines 150-152 for an explanation. Same logic here. 
                        warn_react_inactivity = setTimeout(warn_timer, 1209600000) // we set a countdown timer for a certain number of milliseconds, in this case equal to 30 days
                        function warn_timer(){ // if the 30 days pass, this funciton executes
                            warn_reactInactive = true; // if the 30 days pass, the reaction inactivity variable is set to True, indicating  user hasn't reacted to any messages in the past 30 days  
                            console.log('warn_reactInactive'+warn_reactInactive);      
                            if(warn_reactInactive === true){ // this filters it down to just the reactions added by the joining member
                                clearTimeout(reaction_inactivity) // refer to lines 150-152 for an explanation. Same logic here. 
                                reaction_inactivity = setTimeout(timer, 604800000) // we set a countdown timer for a certain number of milliseconds, in this case equal to 30 days
                                function timer(){ // if the 30 days pass, this funciton executes
                                    rctninactivity = true; // if the 30 days pass, the reaction inactivity variable is set to True, indicating  user hasn't reacted to any messages in the past 30 days  
                                    console.log('rctninactivity'+ rctninactivity);
                                }
                            }    
                        }
                    }   
                }
            })

            warn_confirmInactive = setInterval(warn_confirm_timer, 1000) // setting up the function to check if member is active or not- setInterval will repeat a task every x milliseconds (in tis case every second or 1000ms)
            function warn_confirm_timer(){ // this fucntion is executed once every second
                if(warn_msgInactive && warn_reactInactive === true){ // if both message AND reaction inactivity variables are set to true then execute the following code
                    bot.sendMessage({
                        to: member.id,
                        message:'Looks like you haven\'t been active on Stonks Society in two weeks. If you don\'t send any messages or react to any posts within the next week, we\'ll go ahead and remove you from the server' 
                    })
                    clearInterval(warn_confirmInactive)
                }
            }

            confirm_inactivity = setInterval(timer, 1000) // setting up the function to check if member is active or not- setInterval will repeat a task every x milliseconds (in tis case every second or 1000ms)
            function timer(){ // this fucntion is executed once every second
                if(msginactivity && rctninactivity === true){ // if both message AND reaction inactivity variables are set to true then execute the following code
                    bot.kick({
                        serverID: serverID,
                        userID: member.id
                    }, 
                    (err)=>{
                        if(err)console.log(err)
                    });

                    bot.sendMessage({
                        to:member.id,
                        message:'Due to your inactivity on the Stonks Society Server, you have been removed from the server. Please re-join the server if you miss us! View premium membership options here: https://www.stonkssociety.com/memberships'
                    })
                    clearInterval(confirm_inactivity)
                }
            }
        }
    })
});

























