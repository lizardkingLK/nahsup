import React,{ forwardRef, useEffect,useImperativeHandle,useRef  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NullError from './NullError';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))
const arr1 = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
const TimeTable =forwardRef(({ schedule,sessions,type,students,preferences,consecutives },ref) => {
    const classes = useStyles();
    const [columns, setColumns] = React.useState([]);
    const [time, setTime] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [slots, setSlots] = React.useState(0);
    const [mr, setMr] = React.useState([])
    const childRef = useRef();
      
      const rows1 = [
        { id: 1, Mon: 'Snow', Tue: 'Jon', Wed: 'hey',Thu:'' },
        
      ];
      
    
    useEffect(() => {
  
  }, []);
   
  const getHrs = (date) => {
    var res = new Date(date).getHours();
    return res;
}
const getMins = (mins) => {
    var res = new Date(mins).getMinutes();
    return res;
}
const getTime = (time) => {
    var hours = new Date(time).getHours();
    var minutes = new Date(time).getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
const getLine = (x) => {
    let newX=x.split (' ');
    let newText=x.split ('\n').map ((item, i) =>
        <p key={i}>{item}</p>
   );
    return newText;
}

useImperativeHandle(ref, () => ({
   heading(searchVal){

    if (searchVal==null) {
        childRef.current.handleClickOpen(0);
    }
    else{
    var workingDays = schedule[0].workingDays.split(',');
   
    while(columns.length > 0) {
        columns.pop();
    }

    columns.push('Time');

    arr1.forEach(data => {
      workingDays.forEach(item => {
        if (data == item) {
          columns.push(data);
        }
      });
    });

    //Time slots
    var startTime = new Date(schedule[0].stime);
    var endTime = new Date(schedule[0].stime);
    endTime.setHours( endTime.getHours() + getHrs(schedule[0].wtime) );
    endTime.setMinutes(endTime.getMinutes()+getMins(schedule[0].wtime));
    
    let dura=0;
    var noOfSlots=0;
    if (schedule[0].duration == "One Hour")
    {
        dura = 60;
    }

    else if (schedule[0].duration == "Thirty mins")
    {
        dura = 30;
    }
    while (startTime.setMinutes(startTime.getMinutes()+ dura) <= endTime)
    {
        time.push(getTime(startTime))
        noOfSlots++;
    }
   setMr(rows)

    var arr2d = [ ];
    var sessionCnt = 0;
    let sessionLen = sessions.length;
    
    //Session list re arrange for the consecutive

    //sessions1 copy
    var sessions1=[];
    sessions.forEach(element => {
        sessions1.push(element);
    });
    var existingIndex1=0;
    var existingIndex2=0;
    if(consecutives.length>0){
        consecutives.forEach(con => {
            sessions1.forEach(session => {
                if(con.sessions!=null&& con.sessions[0]== session.id ){
                     existingIndex1= sessions1.indexOf(session);
                     
                }
            });
            sessions1.forEach(session => {
                if(con.sessions!=null&& con.sessions[1]== session.id ){
                     existingIndex2= sessions1.indexOf(session);
                }
            });
            
             //getting the next value after the first variable
             if(existingIndex1+1!=existingIndex2){
               
                    var ses1=sessions1.splice(existingIndex1,1);
                    var ses=sessions1.splice(existingIndex1-1,1);
                    var ses2=sessions1.splice(existingIndex2,1);
                    
                    sessions1.splice(existingIndex1-1, 0, ses1[0]);
                    sessions1.splice(existingIndex1, 0, ses2[0]);
                    sessions1.splice(existingIndex2, 0, ses[0]);
                 
             }
        });
        
    }
    const sessionList=sessions1;

    //session copy
    var session_copy=[];
    sessionList.forEach(element => {
        session_copy.push(element);
    });

    let val = 0;
    let value = 0;
    let sessionPrintCounter=0;
    //Initialize the 2d array
      for (let i = 0; i < schedule[0].dayCount; i++) {
          var newArr = [];
          for (let j = 0; j < noOfSlots; j++) {
              newArr.push([]);
          }
          arr2d[i] = newArr;
      }
      


      do {
          for (let i = 0; i < schedule[0].dayCount; i++) {
              for (let j = 0; j < noOfSlots; j++) {
                  if (sessionCnt < sessionLen) {
                      if (arr2d[i][j].length > 0)//checking aray has values
                      {
                          let test = true;
                          while (test) {
                            
                              arr2d[i][j].forEach(element => {
                                var group1="";
                                students.forEach(ele => {
                                    if(ele.groupIdLabel===element.groupIdSub){
                                        group1=ele.groupIdLabel;
                                    }else if(ele.subGroupIdLabel===element.groupIdSub){
                                        group1=ele.groupIdLabel;
                                    }
                                    
                                });
                                var group2="";
                                students.forEach(ele => {
                                    if(ele.groupIdLabel===sessionList[sessionCnt].groupIdSub ){
                                        group2=ele.groupIdLabel;
                                    }else if(ele.subGroupIdLabel===sessionList[sessionCnt].groupIdSub ){
                                        group2=ele.groupIdLabel;
                                    }
                                    
                                })
                                
                                  if (sessionCnt < sessionLen && group1 === group2) {
                                      
                                      
                                      if ((j+1) > noOfSlots) {
                                        //date check for half sessions
                                        if (i + 1 < schedule[0].dayCount) {
                                            i++;
                                        }
                                        j = 0;
                                    }
                                    else {
                                        j++;
                                    }
                                  }
                                  else {
                                      test = false;
                                  }
                              });
                          }
                          if (sessionCnt < sessionLen) {
                              val = (sessionList[sessionCnt].Duration) * 60 / dura;
                              //for half sessions
                              let test1 = true;
                              while (test1) {
                                  if ((j + val) > noOfSlots) {
                                      //date check for half sessions
                                      if (i + 1 < schedule[0].dayCount) {
                                          i++;
                                      }
                                      j = 0;
                                  }
                                  else {
                                      test1 = false;
                                  }
                              }
                              //empty session copy
                              var testing1 = sessionList[sessionCnt];
                              if (session_copy.includes(testing1))
                              {
                                  const index1 = session_copy.indexOf(testing1);
                                  session_copy.splice(index1,1);
                              }
                              for (let y = 0; y < val; y++) {
                                  if ((j + y) < noOfSlots) {
                                      arr2d[i][j + y].push(sessionList[sessionCnt]);
                                  }
                                  else {
                                      break;
                                  }
                              }
                              j = j + val - 1;
                              sessionCnt++;
                          }
                      }
                      else {
                          let val1 = 0;
                          //empty session copy
                          var testing1 = sessionList[sessionCnt];
                          if (session_copy.includes(testing1))
                          {
                              const index11 = session_copy.indexOf(testing1);
                              session_copy.splice(index11,1);
                          }
                         
                          val1 = (sessionList[sessionCnt].Duration) * 60 / dura;
                          //for half sessions
                          let test1 = true;
                          while (test1) {
                              if ((j + val1) > noOfSlots) {
                                  //date check for half sessions
                                  if (i + 1 < schedule[0].dayCount) {
                                      i++;
                                  }
                                  j = 0;
                              }
                              else {
                                  test1 = false;
                              }
                          }
                          for (let y = 0; y < val1; y++) {
                              if ((j + y) < noOfSlots) {
                                  arr2d[i][j + y].push(sessionList[sessionCnt]);
                              }
                          }
                          j = j + val1 - 1;
                          sessionCnt++;
                      }
                  }
                  else {
                      break;
                  }
              }
          }
        
      } while (session_copy.length > 0);
    
  
//Printing TT
    var showArr=[];
    for (var h = 0; h < noOfSlots; h++)
            {var showArrRow=[];
                for (var j = 0; j <=schedule[0].dayCount; j++)
                {
                    var session = "";
                    if(j==0){
                        session=time[h];
                    }else{
                       if(arr2d[j-1][h]!=null){
                        arr2d[j-1][h].forEach(element => {
                                if (type == 0 ) 
                                {
                                    var group="";
                                    students.forEach(ele => {
                                        if(ele.groupIdLabel===element.groupIdSub){
                                            group=ele.groupIdLabel;
                                        }else if(ele.subGroupIdLabel===element.groupIdSub){
                                            group=ele.groupIdLabel;
                                        }
                                    });

                                    //printing lecturers
                                    var lec="";
                                    element.lecName.forEach(lect => {
                                        lec=lec+","+lect 
                                    });

                                    if(group == searchVal){
                                        sessionPrintCounter++;
                                        var isPrinted=true;
                                    preferences.forEach(ele => {
                                        if(ele.sessions.includes(element.id)){
                                            isPrinted=false;
                                            session = session + "\n " +element.subName+ "--\n"+lec+"\n" +element.groupIdSub+"\n"+element.tag+"\n" +ele.rID;
                                        }
                                    });
                                    if(isPrinted){
                                        session = session + "\n " +element.subName+ "--\n"+lec+"\n" +element.groupIdSub+"\n"+element.tag+"\n No room";
                                    };
                                    }
                                    
                                }
                                else if (type == 1 && element.lecName.includes(searchVal) )
                                {
                                    sessionPrintCounter++;  
                                    //printing lecturers
                                    var lec="";
                                    element.lecName.forEach(lect => {
                                        lec=lec+","+lect 
                                    });

                                    var isPrinted=true;
                                    preferences.forEach(ele => {
                                        if(ele.sessions.includes(element.id)){
                                            isPrinted=false;
                                            session = session + "\n " +element.subName+ "--\n"+lec+"\n"  +element.groupIdSub+"\n"+element.tag+"\n"+ele.rID;
                                        }
                                    });
                                    if(isPrinted){
                                        session = session + "\n" +element.subName+ "--\n"+lec+"\n" +element.groupIdSub+"\n"+element.tag+"\n No room";
                                    }
                                }
                                else if (type == 2 )
                                {
                                    preferences.forEach(ele => {
                                        if(ele.rID===searchVal && ele.sessions.includes(element.id)){
                                            console.log(ele.rID);
                                            sessionPrintCounter++;
                                            var lec="";
                                            element.lecName.forEach(lect => {
                                                lec=lec+","+lect 
                                            });
                                            session = session + "\n " +element.subName+ "--\n"+lec+"\n" +element.groupIdSub+"\n"+element.tag+"\n" +ele.rID;
                                        }
                                    });
                                        
                                }
                        });
                       }
                    }
                    showArrRow.push(session);
                }
                showArr.push(showArrRow);
            }
        
        if(sessionPrintCounter==0){
            while(columns.length > 0) {
                columns.pop();
            }
            childRef.current.handleClickOpen(1);
        }else{
            setMr(showArr);
        }
  }
}
}));
   
    return (
       
    <TableContainer component={Paper}>
         <NullError
      ref={childRef}
      />
            <Table className={classes.table} aria-label="locations table" >
           
                <TableHead>
                    <TableRow>
                        {
                            columns.map(col=>(
                                <TableCell key={col}>{col}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mr.map((row,index)=>(
                        <TableRow key={index}>
                            {row.map((x,index)=>(
                                
                                <TableCell key={index}>{getLine(x)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                        
                
                </TableBody>
            </Table>
        </TableContainer>
        
    )
})

export default TimeTable;