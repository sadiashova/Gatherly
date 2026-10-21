import { Suspense } from "react";
import ItemDetails from "@/components/items/ItemDetails";
import styles from "@/components/items/ItemDetails.module.css";

async function ItemDetailsContent({ params }) {
  const { id } = await params;
  return <ItemDetails id={id} />;
}

export default function ItemDetailsPage({ params }) {
  return (
    <Suspense fallback={<div className={styles.loading} role="status">Finding this good thing…</div>}>
      <ItemDetailsContent params={params} />
    </Suspense>
  );
}
