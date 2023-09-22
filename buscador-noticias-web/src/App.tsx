import { TextField, IconButton, Select, MenuItem, List, ListItemText, Button, Card, CardContent, Pagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


function App() {
  const newsData = [
    {
      id: 1,
      title: "Título da Notícia 1",
      body: "Corpo da Notícia 1"
    },
    {
      id: 2,
      title: "Título da Notícia 2",
      body: "Corpo da Notícia 2"
    },
    {
      id: 3,
      title: "Título da Notícia 3",
      body: "Corpo da Notícia 3"
    },
  ];

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        size="medium"
        placeholder="Pesquisar..."
        InputProps={{
          endAdornment: (
            <>
              <Select
                onChange={() => { }}
                style={{ marginRight: 16 }}
              >
                <MenuItem value="title">Título</MenuItem>
                <MenuItem value="body">Corpo da Notícia</MenuItem>
              </Select>
              <IconButton onClick={() => { }} color="primary">
                <SearchIcon />
              </IconButton>
            </>
          ),
        }}
      />

      <List>
        {newsData.map((news) => (
          <Card key={news.id} style={{ marginBottom: 16 }}>
            <CardContent>
              <ListItemText primary={news.title} secondary={news.body} />
              <Button variant="contained" color="primary" onClick={() => { /* Implemente a ação de link aqui */ }}>
                Ler Notícia
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
      <Pagination count={10} size="large" />
    </div>
  );
}

export default App;
