import { Menu, Transition } from '@headlessui/react';
import { Fragment, SVGProps, useEffect, useRef, useState } from 'react';
import { GiHorseHead } from 'react-icons/gi';
import { TiThMenu } from 'react-icons/ti';

export default function DropDownMenu() {
	return (
		<div className="fixed top-10 right-[50%] w-56 text-right">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button>
						<TiThMenu className="h-32 w-32" />
					</Menu.Button>
				</div>
				<Transition
					enter="transition duration-500 "
					enterFrom="transform translate-y-0   opacity-0"
					enterTo="transform scale-100 translate-y-4 opacity-100"
					leave="transition duration-200 translate-y-0 "
					leaveFrom="transform  translate-y-6 opacity-100"
					leaveTo="transform   translate-y-0 opacity-0"
				>
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										STUFF
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										STUFFFFF
									</button>
								)}
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										STUFFFFF
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<GiHorseHead className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										STUFFFFF
									</button>
								)}
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<GiHorseHead
												className="mr-2 h-5 w-5 text-violet-400"
												aria-hidden="true"
											/>
										) : (
											<GiHorseHead
												className="mr-2 h-5 w-5 text-violet-400"
												aria-hidden="true"
											/>
										)}
										STUFFFFF
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
