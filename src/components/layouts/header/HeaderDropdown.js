import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useCookies } from 'react-cookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function HeaderDropdown({ nickname }) {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const onLogoutClick = () => {
        removeCookie('SKAT');
        removeCookie('nickname');
        window.location.href = '/';
    };
    return (
        <Menu as="div" className="relative inline-block text-left ml-1">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm text-gray-700">
                    {nickname}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/profile"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    내 정보
                                </a>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/borrow/create"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    글쓰기
                                </a>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={onLogoutClick}
                                >
                                    로그아웃
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
