import React from 'react';
import './PreLoader.css';

const PreLoader = () => {
    return (
        <div className="loader-component">
            <div className="bookshelf_wrapper">
                <ul className="books_list">
                    <li className="book_item first"></li>
                    <li className="book_item second"></li>
                    <li className="book_item third"></li>
                    <li className="book_item fourth"></li>
                    <li className="book_item fifth"></li>
                    <li className="book_item sixth"></li>
                </ul>
                <div className="shelf"></div>
                <div className="text-center m-3" style={{ zIndex: 50, color: "red" }}><h4>Learn Finnish with me</h4></div>
            </div>
        </div>

    );
};

export default PreLoader;
