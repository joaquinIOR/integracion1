import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react"
import { useCart } from "../contexts/Cart.context";

export const ItemCard = (props: any) => {
  const { addToCart } = useCart();

     return (
    <IonCard style={{padding:10}} button>
      <div style={{width: '100%', height: 200, textAlign: 'center'}}>
        <img height={200} alt="Silhouette of mountains" src={props.item.img}/>
      </div>
      <IonCardHeader>
        <IonCardTitle>{props.item.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{props.item.price ? props.item.price[props.item.price.length - 1].value : 0}</IonCardContent>
      <IonButton expand="full" onClick={() => addToCart(props.item)}>
        Añadir al Carrito
      </IonButton>
    </IonCard>
  );
}
