import { TextField, Select, MenuItem, IconButton, List, Card, CardContent, ListItemText, Button, Pagination } from "@mui/material";
import { Component } from "react";
import SearchIcon from '@mui/icons-material/Search';
import NewsService from "../service/NewsService";
import News from "../models/News";

type Props = {};
type State = {
    newsData: News[];
};



class BuscarNoticia extends Component<Props, State>{

    private readonly newsService = new NewsService();

    constructor(props: Props | Readonly<Props>) {

        super(props);

        this.state = {
            newsData: [],
        };
    }

    componentDidMount() {
        this.newsService.getNews(0, 10).then((response) => this.setState({ newsData: response.content }));
    }

    render() {
        const { newsData } = this.state;
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
                                <ListItemText primary={news.title} secondary={news.text} />
                                <Button variant="contained" color="primary" onClick={() => {
                                    window.open(news.url, '_blank');
                                }}>
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
}

export default BuscarNoticia;