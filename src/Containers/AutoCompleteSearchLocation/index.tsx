import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import { debounce } from "lodash";

import { getGeolocation } from "Services/location";
import COLORS from "Constants/Colors";
import { SearchLocationValueType } from "../WeatherLocation/types";

type OptionType = {
  place_name: string;
  text: string;
};

type AutoCompleteSearchLocationPropsType = {
  onChange: (event: ChangeEvent<{}>, value: SearchLocationValueType) => void;
};

const SearchWrapper = styled.div`
  display: flex;
  background-color: ${COLORS.WHITE};
  border-radius: 4px;
`;

const MainTextOption = styled.span`
  font-weight: 600;
`;

const SecondaryTextOption = styled.span`
  font-size: 0.8rem;
  color: ${COLORS.GRAY};
`;

const getOptionLabel = (option: OptionType) => option.place_name;

const AutoCompleteSearchLocation: FC<AutoCompleteSearchLocationPropsType> = props => {
  const { onChange } = props;
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const getGeolocationFormSearchKeyword = debounce(async (searchKeyword: string) => {
    const geolocationData = searchKeyword && (await getGeolocation(searchKeyword));
    if (geolocationData) {
      setAutocompleteOptions(geolocationData.features);
    } else {
      setAutocompleteOptions([]);
    }
  }, 500);

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const searchKeyword = event.target.value;
    getGeolocationFormSearchKeyword(searchKeyword);
  };

  return (
    <Autocomplete
      autoComplete
      freeSolo
      getOptionLabel={getOptionLabel}
      options={autocompleteOptions}
      onChange={onChange}
      renderInput={params => (
        <SearchWrapper>
          <InputBase
            {...params}
            className="w-100 pl-2"
            placeholder="Search location"
            onChange={handleSearch}
            endAdornment={
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            }
          />
        </SearchWrapper>
      )}
      renderOption={(option: OptionType) => (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <LocationOnIcon />
          </Grid>
          <Grid item container direction="column" xs>
            <MainTextOption>{option.text}</MainTextOption>
            <SecondaryTextOption>{option.place_name}</SecondaryTextOption>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default AutoCompleteSearchLocation;
