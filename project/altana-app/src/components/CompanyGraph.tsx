import { useEffect } from "react"
import cytoscape from "cytoscape";

interface CompanyGraphProps { //assigning props so that I can use the company_name on the selected company's node, and the suppliers to assign to the 'non-source' node
    selectedCompany: {
        company_name: string
        suppliers: string[]
    } 
}

const CompanyGraph = ({ selectedCompany: {suppliers, company_name} }: CompanyGraphProps) => {

    useEffect(() => {
        const elementNodes = suppliers.map(i => ({ data: { id: i } })) //mapping all suppliers to nodes
        elementNodes.push({data: {id: company_name}}) //adding an extra node that will become the source node that displays the selected company's name
        const elementEdges = suppliers.map((i, index) => ({ data: { id: index.toString(), source: company_name, target: i } })) 
        //adds edges from the supplier nodes to the source node
        cytoscape({

            container: document.getElementById('cy'), // container to render in
            elements: {

                nodes: elementNodes,//next steps here would have been to include a cy.on('tap') function that selects the node. I would have 
                //then added the ability to list the selected nodes suppliers using the api @ https://api.altana.ai/atlas/v1/ui/#/company/get_trading_partners
                edges: elementEdges  
              },
              //I ALSO would have added a clear function to get rid of the existing plot of nodes when a the search bar is selected, or a clear button.

            style: [ // styling found on cytoscope documentation, I did not have much time to make changes. 
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],

            layout: {
                name: 'grid',
                rows: suppliers.length //this makes it slightly easier to see the nodes spread out
            },

        });
    })

    //returns the nodes
    return <>
        <div id="cy"></div>
    </>
}

export default CompanyGraph