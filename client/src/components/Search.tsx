import { IonSearchbar } from "@ionic/react"
export const SearchBar = () => {
     return (
      <IonSearchbar slot="end" style={
        {maxWidth: 100, marginRight: 10, minWidth: 350}
      }/>
  );
}
