#include<iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <algorithm>

using namespace std;

void addData(string filename, string str) {
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

bool is_dupplicate(string filename, string newLine) {
    string line;
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        if (line.compare(newLine) == 0) {
            return true;
        }
    }
    infile.close();
    return false;
}

vector<string> findRecordsByDisease(string filename, string disease) {
    vector<string> result;
    string line;
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        if (line.find(disease) != string::npos) {
            
            result.push_back(line.substr(0, line.find(",")));
        }
    }
    infile.close();
    return result;
}

int countCases(string filename, string disease, string location) {
    int result=0;
    string line;
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        if (line.find(disease) != string::npos && (location.empty() ? true : line.find(location) != string::npos)) {
            size_t pos = 0;
            while ((pos = line.find(",")) != string::npos) {
                line.erase(0, pos + 1);
            }
            result += stoi(line);
        }
    }
    infile.close();
    return result;
}            
bool compareFunction (string a, string b) {return a<b;} 

void readData(string filename, bool printDiseasesOnly = false) {
    vector<string> foundRecords{};
    string line;
    ifstream infile;
    infile.open(filename);
    while (getline(infile, line)) {
        if (printDiseasesOnly) {
            vector<string> parts{};
            size_t pos = 0;
            while ((pos = line.find(",")) != string::npos) {
                parts.push_back(line.substr(0, pos));
                line.erase(0, pos + 1);
            }
            string disease = (parts.size() > 1 ? parts.at(1) : "");
            if (disease.empty()) {
                continue;
            }
            if(!count(foundRecords.begin(), foundRecords.end(), disease)) {
                foundRecords.push_back(disease);
            }
        } else {
            foundRecords.push_back(line);
        }
    }
    infile.close();
    sort(foundRecords.begin(),foundRecords.end(),compareFunction);
    for(auto data:foundRecords){
        cout << data << endl;
    }
    
}

int help(){

    cout << "Need any help? Type 'help' then press Enter key."<<endl;

    string command;

    do{
        cout << "Console >";
        getline(cin,command);

        for_each(command.begin(), command.end(), [](char & c){
            c = ::tolower(c);
        });

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

        if (splitedCommands.at(0).compare("add") == 0)
        {
            if(is_dupplicate("locations.csv", splitedCommands.at(1))) {
                cout << "This location already exist" << endl;
                continue;
            }
            addData("locations.csv", splitedCommands.at(1));
            cout << "Location " << splitedCommands.at(1) << " is successfully added !"<<endl;
        }
        else if (splitedCommands.at(0).compare("delete") == 0)
        {
            if(!is_dupplicate("locations.csv", splitedCommands.at(1))) {
                cout << "This location does not exist" << endl;
                continue;
            }
            delete_line("locations.csv", splitedCommands.at(1));
            delete_line("cases.csv", splitedCommands.at(1));
            cout << "Location " << splitedCommands.at(1) << " is successfully deleted !"<<endl;
        }
        else if (splitedCommands.at(0).compare("record") == 0)
        {
            string data = splitedCommands.at(1).append(",").append(splitedCommands.at(2)).append(",").append(splitedCommands.at(3));
            if(is_dupplicate("cases.csv", data)) {
                cout << "This record already exist" << endl;
                continue;
            }
            addData("cases.csv", data);
            cout << "Record is successfully added !"<<endl;
        }
        else if (splitedCommands.at(0).compare("where") == 0)
        {
            vector<string> result = findRecordsByDisease("cases.csv", splitedCommands.at(1));
            for (int i = 0; i < result.size(); i++)
            {
                cout << result.at(i) << endl;
            }
            if(result.size() == 0){
                cout << "No Location with this disease !"<<endl;
            }
        }
        else if (splitedCommands.at(0).compare("cases") == 0)
        {
            if(splitedCommands.size() == 2){
                cout << "Total cases of " << splitedCommands.at(1) << " are " << countCases("cases.csv", splitedCommands.at(1), "") << endl;
            }
            else if(splitedCommands.size() == 3){
                cout << "Cases of " << splitedCommands.at(2) << " in " << splitedCommands.at(1) << " is " << countCases("cases.csv", splitedCommands.at(2), splitedCommands.at(1)) << endl;
            }
        }
        else if (splitedCommands.at(0).compare("list") == 0){
            if(splitedCommands.at(1).compare("locations") == 0){
                readData("locations.csv");
            }
            else if(splitedCommands.at(1).compare("diseases") == 0){
                readData("cases.csv",true);
            }
        }
        else if (splitedCommands.at(0).compare("help") == 0){
            cout << "================================================================================"<<endl;
            cout << "*                            H E L P     M E N U                               *"<<endl;
            cout << "================================================================================"<<endl;
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
        }
        else if (splitedCommands.at(0).compare("exit") == 0){
            return 0;
        }
        else{
            cout << "Invalid command !"<<endl;
        }
        
    } while(command.compare("Exit") != 0 && command.compare("exit") != 0);
    
    return 0;
}

int main(){
    

    cout << "========================================================================================"<<endl;
    cout << "*                     Welcome to Disease Cases Reporting System!                       *"<<endl;
    cout << "****************************************************************************************"<<endl;
    cout << "*   It is developed by Izabayo Cedric as practical evaluation for the end of Year 3.   *"<<endl;
    cout << "****************************************************************************************"<<endl;
    cout << "========================================================================================"<<endl;
    cout << "Starting Time: Tue Jul 05 08:00:00 CAT 2022                                             "<<endl;
    

    help();
 
    cout << "========================================================================================"<<endl;
cout << "*                                            BYE  "<<endl;
    cout << "========================================================================================"<<endl;
    return 0;
}