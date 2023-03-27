import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function BorrowDropdown({ nickname }) {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();

    const onChatClick = () => {};
    const onDenyClick = () => {
        if (!cookies.SKAT) {
            alert('로그인 후 이용이 가능합니다.');
            window.location.href = `/login?re=${location.pathname}`;
        }
        if (cookies.nickname === nickname) {
            alert('자기 자신을 차단할 수 없습니다.');
            return;
        }
        axios
            .put(`/member/deny/${nickname}`)
            .then((response) => {
                console.log(response);
                alert(`${nickname}님이 차단되었습니다.`);
            })
            .catch((error) => {
                console.log(error);
                const code = error.response.data.code;
                if (code === 123) {
                    alert('이미 차단이 되었습니다.');
                }
            });
    };
    return (
        <Menu as="div" className="relative inline-block text-left ml-1">
            <div className="mb-5">
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
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
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
                                    onClick={onChatClick}
                                >
                                    1:1 채팅
                                </button>
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
                                    onClick={onDenyClick}
                                >
                                    차단
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
