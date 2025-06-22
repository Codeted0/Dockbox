#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <cctype>

using namespace std;

struct User {
    int id;
    string name;
    vector<string> hobbies;
    vector<string> skills;
    int matchScore = 0;
};

// Helper to convert string to lowercase
string toLower(const string& str) {
    string lower = str;
    transform(lower.begin(), lower.end(), lower.begin(), ::tolower);
    return lower;
}

// Check if container has a string
bool contains(const vector<string>& vec, const string& value) {
    return find(vec.begin(), vec.end(), value) != vec.end();
}

vector<User> searchUsers(const vector<User>& users, const string& namePart,
                         const string& mustHaveSkill, const string& optionalHobby) {
    vector<User> result;

    for (auto user : users) {
        int score = 0;

        // Check name match
        if (toLower(user.name).find(toLower(namePart)) != string::npos) {
            score += 1;
        }

        // Check skill match
        if (contains(user.skills, mustHaveSkill)) {
            score += 2;
        }

        // Check hobby match
        if (contains(user.hobbies, optionalHobby)) {
            score += 1;
        }

        if (score > 0) {
            user.matchScore = score;
            result.push_back(user);
        }
    }

    // Sort by match score descending
    sort(result.begin(), result.end(), [](const User& a, const User& b) {
        return a.matchScore > b.matchScore;
    });

    return result;
}

int main() {
    vector<User> users = {
        {1, "Gauri Patil", {"painting", "coding", "reading"}, {"JavaScript", "Node.js", "React"}},
        {2, "Riya Mehta", {"writing", "traveling", "chess"}, {"Python", "Data Analysis", "Pandas"}},
        {3, "Aarav Shah", {"gaming", "coding", "biking"}, {"C++", "Java", "DSA"}}
    };

    string searchName = "a";
    string mustSkill = "Java";
    string optionalHobby = "coding";

    vector<User> results = searchUsers(users, searchName, mustSkill, optionalHobby);

    cout << "Matched Users:\n";
    for (const auto& user : results) {
        cout << "- " << user.name << " (Score: " << user.matchScore << ")\n";
    }

    return 0;
}
