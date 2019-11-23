import React, { FC, useState } from "react";
import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { debounce } from "lodash";

import { getGeolocation } from "../../Services/location";
import COLORS from "../../Constants/Colors";

type OptionType = {
  place_name: string;
};

type AutoCompleteSearchLocationPropsType = {
  onChange: ((event: React.ChangeEvent<{}>, value: any) => void)
}

const SearchWrapper = styled.div`
  display: flex;
  background-color: ${COLORS.WHITE};
  border-radius: 4px;
`;

const AutoCompleteSearchLocation: FC<AutoCompleteSearchLocationPropsType> = props => {
  const { onChange } = props;
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleSearch = debounce(async (searchKeyword: string) => {
    const geolocationData = searchKeyword && (await getGeolocation(searchKeyword));
    if (geolocationData) {
      setAutocompleteOptions(geolocationData.features);
    } else {
      setAutocompleteOptions([]);
    }
  }, 500);

  const getOptionLabel = (option: OptionType) => option.place_name;

  return (
    <Autocomplete
      getOptionLabel={getOptionLabel}
      noOptionsText="no option"
      options={autocompleteOptions}
      onChange={onChange}
      renderInput={params => (
        <SearchWrapper>
          <InputBase
            {...params}
            className="w-100 pl-2"
            placeholder="Search"
            onChange={e => handleSearch(e.target.value)}
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </SearchWrapper>
      )}
    />
  );
};

export default AutoCompleteSearchLocation;
