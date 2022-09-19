import { HiOutlineMenu } from "react-icons/hi";

function Header() {
	function event() {
		return console.log("event triggered");
	}
	return (
		<>
			<div className="flex border-t-[1px] w-mobile border-b-[1px] border-slate-300">
				<button onClick={event} className=" self-center pl-2">
					<HiOutlineMenu className="h-7 w-7 " />
				</button>
				<div className="w-mobile font-[sora] tracking-[4px]  text-[40px] text-center font-extrabold text-[#f3de8a]">
					bookshare
				</div>
			</div>
		</>
	);
}

export default Header;
