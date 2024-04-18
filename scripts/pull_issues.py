import requests
from datetime import datetime
import math
import requests
import json


def generate_markdown_file(issue_data, file_path):
    """
    Generate a Markdown file for a GitHub issue.
    
    Args:
        issue_data (dict): Dictionary containing issue data.
        file_path (str): Path to save the Markdown file.
    """
    with open(file_path, 'w', encoding='utf-8') as file:

        # Write front matter
        file.write('---\n')
        file.write(f"title: '{issue_data['title']}'\n")
        file.write('layout: post\n')  # Adjust layout as needed
        
        file.write('tags: [github, issue]\n')  # Add relevant tags
        file.write("courses: {ToC: {week: " + str(issue_data['week']) + "}}\n")
        file.write("type : plans\n")
        file.write("description : Automatically Populated Github Issue\n")
        file.write('---\n\n')
        
        # Write issue body
        file.write(issue_data['body'] + '\n\n')
        
        # Write comments if available
        if 'comments' in issue_data:
            file.write('## Comments\n\n')
            for comment in issue_data['comments']:
                file.write(f"**{comment['user']['login']}**: {comment['body']}\n\n")


# Generate Markdown file
# generate_markdown_file(issue_data, '_posts/sample_issue.md')

def get_github_repository_issues(token=None):
    # Construct the GraphQL query
    query = """
    query {
    organization(login: "nighthawkcoders") {
        projectsV2(first: 1) {
        nodes {
            items(first: 100) {
            nodes {
                content{
                    ... on Issue {
                    title
                    body
                    url
                    createdAt
                    projectItems(first: 10){
                        nodes{
                            fieldValues(first:5){
                            nodes{
                                ... on ProjectV2ItemFieldValueCommon{
                                ... on ProjectV2ItemFieldDateValue{
                                    date
                                }
                                }
                            }
                            }
                        }
                    }
                }
                }
            }
            }
        }
        }
    }
    }
    """

    # Define headers
    headers = {
        "Authorization": f"Bearer {token}" if token else None,
        "Content-Type": "application/json",
    }

    # Make the request
    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers=headers
    )

    # Check for successful response
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch data:", response.text)
        return None

def create_issues():
  owner = "John-scc"
  repo_name = "jcc_frontend"
  token = getToken()["GithubApi"] 
  
  issues_data = get_github_repository_issues(token)["data"]["organization"]["projectsV2"]["nodes"][0]["items"]["nodes"]
#   print(issues_data)
  date1 = datetime(2023, 8, 21)
  for issue in issues_data:
      issue = issue["content"]
      if issue:
        print(issue["createdAt"])
        year, month, day = map(int, issue["createdAt"][:10].split("-"))
        date2 = datetime(year,month,day)
        difference = date2 - date1
        week = difference.days/7
        issue_data = {
            'title': issue["title"],
            'body': issue["body"],
            'created_at': issue["createdAt"][:10],
            'week': math.floor(week - 3)
        }
        generate_markdown_file(issue_data, f"_posts/{issue['createdAt'][:10]}-{issue['title'].replace(' ', '-').replace('/', ' ')}_GithubIssue_.md")

def getToken():
    # Replace 'YOUR_API_ENDPOINT' with the actual HTTP API endpoint URL
    api_endpoint = 'https://7vybv54v24.execute-api.us-east-2.amazonaws.com/GithubSecret'

    # Define headers if needed
    headers = {
        'Content-Type': 'application/json',
    }

    try:
        # Make a POST request (or GET, PUT, DELETE, etc. depending on your API)
        response = requests.post(api_endpoint, headers=headers)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            return json.loads(response.json())
        else:
            print("Request failed with status code:", response.status_code)
            print("Response:", response.text)

    except Exception as e:
        print("Error:", str(e))

    
if __name__ == "__main__":
    create_issues()
