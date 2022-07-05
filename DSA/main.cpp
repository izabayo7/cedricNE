#include<iostream>

using namespace std;


int help(){

    string command;

    cout << "Need any help? Type 'help' then press Enter key."<<endl;

    do{
        cout << "================================================"<<endl;
        cout << "*              H E L P     M E N U             *"<<endl;
        cout << "================================================"<<endl;
        cout << "add <Location>                              :Add a new location"<<endl;
        cout << "delete <Location>                           :Delete an existing location"<<endl;
        cout << "record <Location> <disease> <cases>         :Record a disease and its cases"<<endl;
        cout << "list locations                              :List all existing locations"<<endl;
        cout << "list diseases                               :List existing diseases in locations"<<endl;
        cout << "where <disease>                             :Find where disease exists"<<endl;
        cout << "cases <Location> <disease>                  :Find cases of a disease in location"<<endl;
        cout << "cases <disease>                             :Find total cases of a given disease"<<endl;
        cout << "help                                        :Prints user manual"<<endl;
        cout << "Exit                                        :Exit the program"<<endl;
        cout << "================================================================================"<<endl;
        cout << "Enter your command:"<<endl;
        getline(cin,command);
        system("clear");
        // check if string contains 'help' cpp
        if (command.find("add") != string::npos)
        {
            cout << "add called"<<endl;
        }
        else if (command.find("delete") != string::npos)
        {
            cout << "delete called"<<endl;
        }
        else if (command.find("record") != string::npos)
        {
            cout << "record called"<<endl;
        }
        else if (command.compare("list locations") == 0)
        {
            cout << "list locations called"<<endl;
        }
        else if (command.compare("list diseases") == 0)
        {
            cout << "list diseases called"<<endl;
        }
        else if (command.find("where") != string::npos)
        {
            cout << "where called"<<endl;
        }
        else if (command.find("cases") != string::npos)
        {
            cout << "cases called"<<endl;
        }
        else if(command.compare("help") != 0 && command.compare("Exit") != 0 && command.compare("exit") != 0)
        {
            cout << "Invalid command"<<endl;
        }
        
    } while(command.compare("Exit") != 0 && command.compare("exit") != 0);
    
    return 0;
}

int main(){
    

    cout << "================================================"<<endl;
    cout << "*  Welcome to Disease Cases Reporting System!  *"<<endl;
    cout << "*  ****************************************** *"<<endl;
    cout << "*   Developed by Izabayo Cedric as practical.  *"<<endl;
    cout << "*  ******************************************* *"<<endl;
    cout << "================================================"<<endl;
    
    help();
    
    return 0;
}