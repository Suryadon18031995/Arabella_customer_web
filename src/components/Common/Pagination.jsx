// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const ranges = [];
    while (i <= to) {
        ranges.push(i);
        i += step;
    }
    return ranges;
};

class Pagination extends Component {
    constructor(props) {
        super(props);
        const { totalRecords = null, pageLimit = 10, pageNeighbours = 0 } = props;
        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
        this.pageNeighbours = typeof pageNeighbours === 'number'
            ? Math.max(0, Math.min(pageNeighbours, 2))
            : 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    }

    handleClick = (page) => {
        this.props.onPageChanged(Math.max(0, Math.min(page, this.totalPages)));
    }

    handleMoveLeft = (evt) => {
        evt.preventDefault();
        const page = this.props.currentPage - (this.pageNeighbours * 2) - 1;
        const currentPage = Math.max(0, Math.min(page, this.totalPages));
        this.props.onPageChanged(currentPage);
    }

    handleMoveRight = (evt) => {
        evt.preventDefault();
        const page = this.props.currentPage + (this.pageNeighbours * 2) + 1;
        const currentPage = Math.max(0, Math.min(page, this.totalPages));
        this.props.onPageChanged(currentPage);
    }

    fetchPageNumbers = () => {
        const { totalPages, pageNeighbours } = this;
        const { currentPage } = this.props;
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            let pages = range(startPage, endPage);
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    }

    render() {
        if (!this.totalRecords || this.totalPages === 1) return null;

        const { currentPage } = this.props;
        const pages = this.fetchPageNumbers();

        return (
            <div>
                <nav aria-label="Countries Pagination">
                    <ul className="pagination" style={{ float: 'right' }}>
                        {pages.map((page, index) => {
                            if (page === LEFT_PAGE) {
                                return (
                                    <li key={index} className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                );
                            }

                            if (page === RIGHT_PAGE) {
                                return (
                                    <li key={index} className="page-item">
                                        <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                );
                            }

                            return (
                                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                    <a className="page-link" onClick={evt => this.handleClick(page, evt)}>{page}</a>
                                </li>
                            );
                        })}

                    </ul>
                </nav>
            </div>
        );
    }
}

Pagination.propTypes = {
    totalRecords: PropTypes.number,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func,
};

export default Pagination;
