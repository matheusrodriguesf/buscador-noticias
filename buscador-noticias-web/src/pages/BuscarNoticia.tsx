import React, { Component } from "react";
import { TextField, Select, MenuItem, IconButton, List, Card, CardContent, ListItemText, Button, Pagination, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NewsService from "../service/NewsService";
import News from "../models/News";

type Props = {};
type State = {
    totalElements: number,
    newsData: News[];
    pageable: {
        page: number,
        size: number,
    },
    searchTerm: string;
    searchOption: string;
};

class BuscarNoticia extends Component<Props, State> {
    private readonly newsService = new NewsService();

    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {
            totalElements: 0,
            newsData: [],
            pageable: {
                page: 0,
                size: 10,
            },
            searchTerm: '',
            searchOption: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTermoSearch = this.handleTermoSearch.bind(this);
    }

    componentDidMount() {
        this.loadNews();
    }

    private loadNews = async (page = 0, size = 10) => {
        try {
            this.setState({
                pageable: { ...this.state.pageable, size, page }
            });
            const { content, totalElements } = await this.newsService.getNews(page, size);
            this.setState({ newsData: content, totalElements });
        } catch (err) {
            throw err;
        }

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

    private readonly handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    };


    render() {
        return (
            this.content()
        );
    }

    private content() {
        const { newsData, searchOption } = this.state;
        return (
            <Grid>
                {this.inputSearchComponent(searchOption)}
                {this.listNews(newsData)}
                {this.paginationComponent()}
            </Grid>
        );
    }

    private inputSearchComponent(searchOption: string) {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="medium"
                    placeholder="Pesquisar..."
                    value={this.state.searchTerm}
                    onChange={this.handleTermoSearch}
                    inputProps={{ onKeyDown: this.handleKeyDown }}
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

        );
    }

    private paginationComponent() {
        const handleChangePage = async (_event: unknown, page: number) => {
            const pageIndex = page - 1;
            await this.loadNews(pageIndex, this.state.pageable.size);
        };
        return (
            <Pagination
                count={this.state.totalElements}
                page={this.state.pageable.page + 1}
                onChange={handleChangePage}
                size="large" />
        );
    }

    private listNews(newsData: News[]) {
        return (
            <List>
                {newsData.map((news) => (
                    <Card key={news.id} style={{ marginBottom: 16 }}>
                        <CardContent>
                            <ListItemText
                                primary={<span style={{ fontWeight: 'bold' }}>{news.title}</span>}
                                secondary={<div style={{ textAlign: 'justify' }}>{news.text}</div>}
                            />
                            <Button variant="contained" color="primary" onClick={() => { window.open(news.url, '_blank'); }}>
                                Ler Notícia
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </List>
        );
    }

}
export default BuscarNoticia;
