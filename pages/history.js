import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Card, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData"; // Import removeFromHistory

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null; // Add this line

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    // Make removeHistoryClicked async
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index])); // Update setSearchHistory
  };

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card body>Nothing Here Try searching for some artwork</Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
              className={styles.historyListItem}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
