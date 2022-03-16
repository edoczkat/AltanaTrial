import { FC } from "react"

interface CompanyListProps {
    company_name: string;
    suppliers: string[];
    showGraph: any;
}

const CompanyList: FC<CompanyListProps> = ({company_name, suppliers, showGraph}) => {
    return <div onClick={() => showGraph(suppliers, company_name)}>{company_name}</div> //this displays the list of returned company names from the search
    //then when clicking the name it will bring up the cytoscope graph, if there are suppliers
}

export default CompanyList