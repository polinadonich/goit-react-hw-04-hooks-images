import { useState } from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";
// import SearchForm from "../SearchForm";

// class Searchbar extends Component {
//   state = {
//     searchQuery: "",
//   };

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  // handleSearchQuery = (e) => {
  //   this.setState({ searchQuery: e.currentTarget.value });
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.onSubmit(this.state.searchQuery);
  //   this.setState({ searchQuery: "" });
  //   if (this.state.searchQuery === "") {
  //     toast.error("Please, enter your request!");
  //   }
  // };

  const searchItem = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.searchItem}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={searchItem}
          placeholder="Search images and photos"
        />
      </form>
      {/* <SearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleSearchQuery}
          value={searchQuery}
        /> */}
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
