import React, { Component } from "react";
import { TextField, Select, MenuItem, IconButton, List, Card, CardContent, ListItemText, Button, Pagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NewsService from "../service/NewsService";
import News from "../models/News";

type Props = {};
type State = {
    newsData: News[];
    searchTerm: string;
    searchOption: string;
};

class BuscarNoticia extends Component<Props, State> {
    private readonly newsService = new NewsService();

    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {
            newsData: [],
            searchTerm: '',
            searchOption: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTermoSearch = this.handleTermoSearch.bind(this);
    }

    componentDidMount() {
        this.loadNews();
    }

    private loadNews = async () => {
        const response = await this.newsService.getNews(0, 10);
        this.setState({ newsData: response.content });
    }

    private searchTitle = async (title: string) => {
        const response = await this.newsService.searchTitle(title);
        this.setState({ newsData: response.content });
    }

    private searchText = async (text: string) => {
        const response = await this.newsService.searchText(text);
        this.setState({ newsData: response.content });
    }

    private readonly handleSearch = async () => {
        const { searchTerm, searchOption } = this.state;

        const searchFunctions: { [key: string]: (term: string) => Promise<void> } = {
            title: this.searchTitle,
            body: this.searchText,
        };

        const selectedSearchFunction = searchFunctions[searchOption];

        if (searchTerm && selectedSearchFunction) {
            await selectedSearchFunction(searchTerm);
        } else {
            await this.loadNews();
        }
    };


    private readonly handleTermoSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const searchTerm = event.target.value || event.currentTarget.value;
        this.setState({ searchTerm });
    };

    render() {
        const { newsData, searchOption } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="medium"
                        placeholder="Pesquisar..."
                        value={this.state.searchTerm}
                        onChange={this.handleTermoSearch}
                    />
                    <Select
                        value={searchOption}
                        onChange={(e) => this.setState({ searchOption: e.target.value })}
                        style={{ marginRight: 16 }}
                    >
                        <MenuItem value="title">Título</MenuItem>
                        <MenuItem value="body">Corpo da Notícia</MenuItem>
                    </Select>
                    <IconButton onClick={this.handleSearch} color="primary">
                        <SearchIcon />
                    </IconButton>
                </div>

                <List>
                    {newsData.map((news) => (
                        <Card key={news.id} style={{ marginBottom: 16 }}>
                            <CardContent>
                                <ListItemText primary={news.title} secondary={news.text} />
                                <Button variant="contained" color="primary" onClick={() => { window.open(news.url, '_blank'); }}>
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
