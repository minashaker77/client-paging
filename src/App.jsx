import { useEffect, useState } from "react";
import usePaginatedFetch from "./usePaginatedFetch";
import Card from "./components/card";
import Pagination from "./components/pagination";
const url =
	"https://react-mini-projects-api.classbon.com/Programmer/programmers";

function App() {
	const [loading, data] = usePaginatedFetch(url, 3);
	//for show active page:
	const [page, setPage] = useState(1);
	//for showing each page data:
	const [programmers, setProgrammers] = useState([]);

	useEffect(() => {
		if (loading) return;
		setProgrammers(data[page - 1]);
	}, [loading, page]);

	return (
		<div className="container pt-5">
			{loading && (
				<div className="d-flex justify-content-center">
					<div className="spinner-border"></div>
				</div>
			)}
			{!loading && (
				<>
					<div className="row d-flex justify-content-center">
						{programmers.map(({ id, ...programmers }) => {
							return (
								<div className="col-3" key={id}>
									<Card {...programmers} />
								</div>
							);
						})}
					</div>
					<div className="row">
						<Pagination pages={data.length} setPage={setPage} activePage={page}/>
					</div>
				</>
			)}
		</div>
	);
}

export default App;