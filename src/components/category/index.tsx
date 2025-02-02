'use client';

import React from 'react';
import styles from "./styles.module.css";

import { usePathname } from 'next/navigation';

import PaginationButtons from './buttons';
import CardList from '../card-list';

import { CategoryProps } from '@/types/props';

import { getMoviesPopular, getMoviesTopRated, getMoviesUpcoming } from '@/services/services-movies';
import { getTvOnTheAir, getTvPopular, getTvTopRated } from '@/services/services-tv';

const Category = ({ popular, topRated, upcoming }: CategoryProps) => {

    const pathname = usePathname();

    const [isLoading, setIsLoading] = React.useState(false);
    const [isActive, setIsActive] = React.useState({
        popular: true,
        topRated: false,
        estreia: false
    });
    const [pagination, setPagenation] = React.useState({
        popular: 1,
        topRated: 1,
        estreia: 1
    });
    const [category, setChangeCategory] = React.useState('')
    const [topRatedList, setTopRatedList] = React.useState(topRated);
    const [upcomingList, setUpcomingList] = React.useState(upcoming);
    const [popularList, setPopularList] = React.useState(popular);

    const toggolCategory = (intex: number) => {
        switch (intex) {
            case 1:
                setIsActive({
                    popular: true,
                    topRated: false,
                    estreia: false
                });
                break;
            case 2:
                setIsActive({
                    popular: false,
                    topRated: true,
                    estreia: false
                });
                break;
            case 3:
                setIsActive({
                    popular: false,
                    topRated: false,
                    estreia: true
                });
                break;
        }
    }

    const handlePageChange = (page: number, category: string) => {
        if (page < 1) return;

        switch (category) {
            case 'popular':
                setPagenation({
                    popular: page,
                    topRated: pagination.topRated,
                    estreia: pagination.estreia
                });
                setChangeCategory(category);
                break;
            case 'top_rated':
                setPagenation({
                    popular: pagination.popular,
                    topRated: page,
                    estreia: pagination.estreia
                });
                setChangeCategory(category);
                break;
            case 'upcoming':
            case 'on_the_air':
                setPagenation({
                    popular: pagination.popular,
                    topRated: pagination.topRated,
                    estreia: page
                });
                setChangeCategory(category);
                break;
        }
    }

    const PageChange = async (category: string) => {
        setIsLoading(true);

        if (pathname === '/movies') {
            if (category === 'popular') {
                const popular = await getMoviesPopular(pagination.popular);
                if (popular)
                    setPopularList(popular);
            }
            else if (category === 'top_rated') {
                const topRated = await getMoviesTopRated(pagination.topRated);
                if (topRated)
                    setTopRatedList(topRated);
            }
            else if (category === 'upcoming') {
                const upcoming = await getMoviesUpcoming(pagination.estreia);
                if (upcoming)
                    setUpcomingList(upcoming);
            }
        }

        if (pathname === '/tv') {
            if (category === 'popular') {
                const popular = await getTvPopular(pagination.popular);
                if (popular)
                    setPopularList(popular);
            }
            else if (category === 'top_rated') {
                const topRated = await getTvTopRated(pagination.topRated);
                if (topRated)
                    setTopRatedList(topRated);
            }
            else if (category === 'on_the_air') {
                const upcoming = await getTvOnTheAir(pagination.estreia);
                if (upcoming)
                    setUpcomingList(upcoming);
            }
        }

        setIsLoading(false);
    };

    React.useEffect(() => {
        PageChange(category);    
    }, [category, pagination]);

    return (
        <>
            <div className={styles.category}>
                <div>
                    <button
                        onClick={() => toggolCategory(1)}
                        style={{ backgroundColor: `${isActive.popular ? '#141A29' : ''}` }}
                    >Popular</button>
                    <button
                        onClick={() => toggolCategory(2)}
                        style={{ backgroundColor: `${isActive.topRated ? '#141A29' : ''}` }}
                    >Mas votados</button>
                    <button
                        onClick={() => toggolCategory(3)}
                        style={{ backgroundColor: `${isActive.estreia ? '#141A29' : ''}` }}
                    >{pathname === '/movies' ? 'Laçamentos' : 'Em Exibição'}</button>
                </div>
            </div>

            {
                isActive.popular && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h3><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> Populares</h3>

                            <PaginationButtons
                                currentPage={pagination.popular}
                                category="popular"
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList
                            list={popularList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }

            {
                isActive.topRated && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h3><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> Mas Votados</h3>

                            <PaginationButtons
                                currentPage={pagination.topRated}
                                category="top_rated"
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList
                            list={topRatedList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }

            {
                isActive.estreia && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h3><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> {pathname === '/movies' ? 'para o Laçamento' : 'em Exibição'}</h3>

                            <PaginationButtons
                                currentPage={pagination.estreia}
                                category={pathname === '/movies' ? "upcoming" : "on_the_air"}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList
                            list={upcomingList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }
        </>
    )
}

export default Category;