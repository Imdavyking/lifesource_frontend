/** @format */

import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { Link, useNavigate } from "react-router-dom";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import garbageImage from "@/assets/images/garbage.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { redeemCodeService } from "@/services/authServices";
import { getPointsService } from "../../services/authServices";


function Main() {
	useEffect(() => {
		dom("body").removeClass("main").removeClass("error-page").addClass("login");
		getPointsService().then(accPoints => {
			console.log(accPoints)
			setAccumulatedPoints(accPoints)
		}).catch(err => toast.error(err))
	}, []);


	const navigate = useNavigate();

	const [points, setPoints] = useState("");

	const [accumulatedPoints,setAccumulatedPoints]= useState(0);

	const handleChange = (setState) => (e) => {
		setState(e.target.value);
	};

	const handleClick = async () => {
		if (
			points === ""
		) {
			toast.error("Please fill all fields");
		} else {
			try {
				const response = await redeemCodeService(points);
				toast.success( response.data.message );
				getPointsService().then(accPoints => {
					console.log(accPoints)
					setAccumulatedPoints(accPoints)
				}).catch(err => toast.error(err))
				// navigate( "/" );
				// history.push("/login");
			} catch (e) {
				toast.error(e.message);
			}
		}
	};

	return (
		<>
			<div>
				<DarkModeSwitcher />
				<div className="container sm:px-10">
					<div className="block xl:grid grid-cols-2 gap-4">
						{/* BEGIN: Register Info */}
						<div className="hidden xl:flex flex-col min-h-screen">
							<a href="" className="-intro-x flex items-center pt-5">
								<img
									alt="Midone Tailwind HTML Admin Template"
									className="w-6"
									src={logoUrl}
								/>
								<span className="text-white text-lg ml-3"> LifeSource </span>
							</a>
							<div className="my-auto">
								<img
									alt="Midone Tailwind HTML Admin Template"
									className="-intro-x w-1/2 -mt-16"
									src={garbageImage}
								/>
								<div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
									Redeem your points <br />to earn money.
								</div>
								<div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
								...Blockchain-powered recycling solution
								</div>
							</div>
						</div>
						{/* END: Register Info */}
						{/* BEGIN: Register Form */}
						<div className="h-screen xl:h-auto flex flex-col items-center py-5 xl:py-0  xl:my-0">
							<a href="" className="-intro-x flex items-center pt-5 my-2">
								<img
									alt="Midone Tailwind HTML Admin Template"
									className="w-6"
									src={logoUrl}
								/>
								<span className="text-white text-lg ml-3"> LifeSource </span>
							</a>
							<div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
								<h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                Redeem your points to earn money. {accumulatedPoints} LFT
								</h2>
								<div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
									...Blockchain-powered recycling solution
								</div>
								<div className="intro-x mt-8">
									<input
										type="number"
										value={points}
										step={1}
										onChange={handleChange(setPoints)}
										className="intro-x login__input form-control py-3 px-4 block"
										placeholder="Points"
									/>
				
								</div>

								<div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
									<button
										className="btn btn-primary py-3 px-4 w-full xl:w-64 xl:mr-3 align-top"
										onClick={handleClick}>
																			Redeem Points
									</button>
									<Link to="/redeem-points">
										<button className="btn btn-outline-secondary py-3 px-4 w-full  xl:w-32 mt-3 xl:mt-0 align-top">
                    Add Point 
										</button>
									</Link>
								</div>
							</div>
						</div>
						{/* END: Register Form */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Main;
