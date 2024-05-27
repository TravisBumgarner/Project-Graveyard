import React, { useContext } from "react";
import { context } from "../context.js";
import Menu from "../shared/Menu.js";
import { AppPage, BasePageProps } from "../types.js";

type MenuItem = { label: string, value: AppPage }

type PageProps = {

}

const MainMenu = ({ }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const handleSelect = (value: MenuItem['value']) => {
    dispatch({
      type: 'SET_PAGE',
      payload: {
        page: value
      }
    })
  }

  const items: MenuItem[] = [
    {
      label: "Check Files",
      value: AppPage.ComputeMissingSetup
    },
    {
      label: "Exit",
      value: AppPage.Exit
    },
  ];

  return (<Menu options={items} callback={handleSelect} />);
}

export default MainMenu;