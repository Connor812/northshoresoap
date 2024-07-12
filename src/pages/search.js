import React, { useContext, useState } from "react";
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from "../components/itemCard";
import { TbSearch } from "react-icons/tb";

import "../assets/css/search.css";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const dataContext = useContext(DataContext);
    const data = dataContext.data;
    const products = data.objects;
    const related_objects = data.related_objects;

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchTerm);
    };

    return (
        <div className="search-container">
            <h1 className="search-heading">Search</h1>
            <hr />

            <form onSubmit={handleSearch} className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    aria-label="Search For Products"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" type="submit">
                    <TbSearch />
                </button>
            </form>

            <div className="search-item-display">
                {searchQuery !== '' && (
                    <>
                        {data.length === 0 ? (
                            <p>Error getting soaps.</p>
                        ) : (
                            (() => {
                                const filterProducts = products.filter((soap) => {
                                    const { name, description } = soap.item_data;
                                    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        (description && description.toLowerCase().includes(searchQuery.toLowerCase()));
                                });

                                return filterProducts.length === 0 ? (
                                    <p>No search results found.</p>
                                ) : (
                                    filterProducts.map((item, index) => (
                                        <ItemCard key={index} soap={item} index={index} related_objects={related_objects} />
                                    ))
                                );
                            })()
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
