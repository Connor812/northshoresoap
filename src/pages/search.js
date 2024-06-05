import React, { useContext, useState } from "react";
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from "../components/itemCard";
import "../assets/css/search.css";

function Search() {

    const [searchTerm, setSearchTerm] = useState("");
    const dataContext = useContext(DataContext);
    const data = dataContext.data;
    const products = data.objects;
    const related_objects = data.related_objects;

    console.log(searchTerm);

    return (
        <div className="search-container">
            <h1 className="search-heading">Search</h1>
            <hr />

            <input type="text" className="search-input" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="search-item-display">
                {
                    searchTerm !== '' && (
                        <>
                            {
                                data.length === 0 ? <p>Error getting soaps.</p> :
                                    (() => {
                                        const filterProducts = products.filter((soap) => {
                                            const { name, description } = soap.item_data;
                                            return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                (description && description.toLowerCase().includes(searchTerm.toLowerCase()));
                                        });

                                        return filterProducts.length === 0 ? <p>No search results found.</p> :
                                            filterProducts.map((item, index) => (
                                                <ItemCard key={index} soap={item} index={index} related_objects={data.related_objects} />
                                            ));
                                    })()
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Search;
