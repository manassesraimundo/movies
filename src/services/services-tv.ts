'use server'

import { api } from "./api";

import { Episods, Tv } from "@/types/card";
import { Authores } from "@/types/author";

const key = process.env.API_KEY as String;

const getTv = async () => {
    try {
        const responseTv = await api.get('/discover/tv', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultTv: Tv[] = responseTv.data.results;
        return resultTv;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getTvDetails = async (id: string) => {
    try {
        const response = await api.get(`/tv/${id}`, {
            params: {
                api_key: key,
                language: 'pt-br',
            },
        });
        const result: Tv = response.data;
        return result;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
    }
};

const getSeasonEpisodes = async (tvId: string, seasonNumber: string) => {
    try {
        const response = await api.get(`/tv/${tvId}/season/${seasonNumber}`, {
            params: {
                api_key: key,
                language: 'pt-br',
            },
        });
        const result: Episods[] = response.data.episodes;
        return result;
    } catch (error) {
        console.error('Erro ao buscar os episódios da temporada:', error);
    }
};

const getSeasonBanner = async (tvId: string, seasonNumber: string) => {
    try {
        const response = await api.get(`/tv/${tvId}/season/${seasonNumber}`, {
            params: {
                api_key: key,
                language: 'pt-br',
            },
        });

        const seasonData = response.data;
        const posterUrl = `${seasonData.poster_path}`;

        return posterUrl;
    } catch (error) {
        console.error('Erro ao buscar os detalhes da temporada:', error);
    }
};

const getTvPopular = async () => {
    try {
        const response = await api.get('/tv/popular', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultTv: Tv[] = response.data.results;
        return resultTv;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getTvTopRated = async () => {
    try {
        const response = await api.get('/tv/top_rated', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultTv: Tv[] = response.data.results;
        return resultTv;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getTvOnTheAir = async () => {
    try {
        const response = await api.get('/tv/on_the_air', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultTv: Tv[] = response.data.results;
        return resultTv;
    } catch (error) {
        console.log("Error: ", error)
    }
}

// Faz a requisição para o endpoint de pesquisa
const searchTv = async (query: string, page?: number) => {
    try {
        const response = await api.get('/search/tv', {
            params: {
                api_key: key,    
                query: query,        
                language: 'pt-BR',
                page: page ?? 1
            },
        });

        const resultTv: Tv[] = response.data.results;
        return resultTv;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

const getTvByPage = async (page: number, category: string) => {
    try {
        const response = await api.get(`/tv/${category}`, {
            params: {
                api_key: key,    
                language: 'pt-BR',
                page
            },
        });

        const resultTv: Tv[] = response.data.results;
        return resultTv;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

const getCastTv = async (id: string) => {
    try {
        const response = await api.get(`/tv/${id}/credits`, {
            params: {
                api_key: key,
                language: 'pt-BR',
            },
        });

        const result: Authores[] = response.data.cast;
        return result;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do Tv:', error);
    }
};

export {
    getTv,
    getTvDetails,
    getSeasonEpisodes,
    getSeasonBanner,
    getTvPopular,
    getTvTopRated,
    getTvOnTheAir,
    searchTv,
    getTvByPage,
    getCastTv
}