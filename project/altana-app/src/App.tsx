import { useState } from "react";
import CompanyGraph from "./components/CompanyGraph";
import CompanyList from "./components/CompanyList";
import "./App.css"
interface selectCompany { //I'm not sure it's great practice to use an interface in the App and not just in components. However I ran into an issue with cytoscape and made
  //a quick adjustment
  company_name: string;
  suppliers: string[]
}
export default function App (){

  //need to get text from search bar, then use it create list, using token given
  //make each company clickable 

    const [searchText, setSearchText] = useState<string>("") //set state to be used for the search
    const [data, setData] = useState([]); //data to be used with the results from the search
    const [selectedCompany, setSelectedCompany] = useState<selectCompany>({company_name: "", suppliers: []}) //the company data that corresponds to the clicked company from the list

    const fetchData = async () => {
      //trying to fetch the data from the given api using the given api-key. If there is an error it will log the error in the console. 
      try {
        const response = await(await fetch(`https://api.altana.ai/atlas/v1/company/search/${searchText}`, {
          headers: {
            "X-Api-Key": "MTpJbnRlcnZpZXclMjAyMDIxLTA5LTIyOjE2MzIzNTk2NTU6NWNhMzViYjk.ZmEwZWI5OTdmYWJjYWFlZWJmY2YyNGYyN2FkMmQ5YzkwODQ4NWNiYg"
          }
        })).json()
        setData(response.companies) //setting the data from the search
      } catch (error) {
        console.log(error)
      }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value); //value being entered in the search bar 
      fetchData() //as a new value is entered in the search bar, this will update the results. I was not sure if this method or using a search button made more sense, 
      //so I chose one of the two and went for it. I liked the dynamic approach best, because normally I think it looks nicer. However there are performance issues
      //if returning data from the api is large in size. 
    }

    const showGraph = (suppliers: string[], company_name: string) : void => {
      if (!suppliers.length) return alert("No suppliers for this company") //This will create a display on screen if there are no suppliers for the selected company
      setSelectedCompany({company_name, suppliers}) //this will set the value for selected company using its name and its suppliers
    }


    
    return (
        <div>
          <input //this is the search bar and shows the initial value as the placeholder, shows the function that is called when the value is changed (handleSearch)
          // and shows the value that is being read when rid of the placeholder
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder={"Search for company"}
            />

            {selectedCompany.suppliers && <CompanyGraph selectedCompany={selectedCompany} /> //if the selected company has suppliers it will use the company graph component 
            //to plot the nodes and edges
            } 
            

            {data && data.map((i: any) => (
              <CompanyList key={i.altana_canon_id} showGraph={showGraph} company_name={i.company_name} suppliers={i.company_context.suppliers} />
            ))//if the search yields data it will use the company list component to display this data
            } 
        </div>
    )

    //The app is not visually appealing, there are plenty of things I would have changed. However I wanted to do my best to remain in the time limit that was set so I opted out of that.

}