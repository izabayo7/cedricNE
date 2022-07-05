#include<iostream>
#include <fstream>
#include <sstream>
#include <vector>

using namespace std;

void save_csv(string filename, string str) {
    ofstream outfile;
    outfile.open(filename, ios::app);
    outfile << str << endl;
    outfile.close();
}

void delete_line(string filename, string str) {
    ifstream infile;
    infile.open(filename);
    string line;
    stringstream ss;
    while (getline(infile, line)) {
        if (line.find(str) != string::npos) {
            continue;
        }
        ss << line << endl;
    }
    infile.close();
    ofstream outfile;
    outfile.open(filename);
    outfile << ss.str();
    outfile.close();
}

string get_csv(string filename, string str) {
    string line;
    string result = "";
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        if (line.find(str) != string::npos) {
            result = line;
            break;
        }
    }
    infile.close();
    return result;
}

void print_csv(string filename) {
    string line;
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        cout << line << endl;
    }
    infile.close();
}


int help(){

    string command;

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

        string commandCopy = command;
        string space_delimiter = " ";
        vector<string> splitedCommands{};

        size_t pos = 0;
        while ((pos = commandCopy.find(space_delimiter)) != string::npos) {
            splitedCommands.push_back(commandCopy.substr(0, pos));
            commandCopy.erase(0, pos + space_delimiter.length());
        }
        splitedCommands.push_back(commandCopy);

        if(splitedCommands.size() > 1){
            if (splitedCommands.at(0).compare("add") == 0)
            {
                save_csv("locations.csv", splitedCommands.at(1));
                cout << "Location " << splitedCommands.at(1) << " is successfully added !"<<endl;
            }
            else if (splitedCommands.at(0).compare("delete") == 0)
            {
                delete_line("locations.csv", splitedCommands.at(1));
                cout << "Location " << splitedCommands.at(1) << " is successfully deleted !"<<endl;
            }
            else if (splitedCommands.at(0).compare("record") == 0)
            {
                cout << "record called"<<endl;
            }
            else if (splitedCommands.at(0).compare("where") == 0)
            {
                cout << "where called"<<endl;
            }
            else if (splitedCommands.at(0).compare("cases") == 0)
            {
                cout << "cases called"<<endl;
            }
        }
        if (command.compare("help") == 0)
        {
            cout << "list diseases called"<<endl;
        }
        else if (command.compare("list locations") == 0)
        {
            print_csv("locations.csv");
        }
        else if (command.compare("list diseases") == 0)
        {
            cout << "list diseases called"<<endl;
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
    
    string command;

    cout << "Need any help? Type 'help' then press Enter key."<<endl;
    getline(cin,command);
    system("clear");
    if(command.compare("help") == 0){
        help();
    }
    cout << "================================================"<<endl;
    cout << "*                  BYE  "<<endl;
    cout << "================================================"<<endl;
    return 0;
}