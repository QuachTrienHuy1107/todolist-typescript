import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"

import { searchTaskAction } from "../../store/Actions/TaskAction"
import "./style.scss"

const handleSearchForm = (searchForm: boolean) =>
    searchForm ? "search__form__click" : ""

const SearchForm: React.FC<Record<string, never>> = () => {
    const [searchForm, setSearchForm] = useState(false)
    const dispatch = useDispatch()

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchTaskAction(e.target.value))
    }

    return (
        <div
            className={` ${handleSearchForm(
                searchForm,
            )} form__search flex-nowrap mx-4`}
        >
            <i
                className={`fa fa-${searchForm ? "times" : "search"} mr-2`}
                onClick={() => setSearchForm(!searchForm)}
                onKeyDown={() => setSearchForm(!searchForm)}
                role="button"
                aria-label="search form"
                tabIndex={0}
            />
            <input
                type="text"
                placeholder="Search"
                className="form__search__custom pl-0"
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default SearchForm
