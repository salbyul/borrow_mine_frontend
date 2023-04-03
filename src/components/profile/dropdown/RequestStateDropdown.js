import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function RequestStateDropdown({ state, id }) {
    const [change, setChange] = useState('');
    const [currentState, setCurrentState] = useState(state);

    const changeState = (word) => {
        if (word === 'accept' || word === 'refuse') {
            axios
                .post(`/borrow/request/${word}?id=${id}`)
                .then((response) => {
                    console.log(response);
                    if (word === 'accept') {
                        setChange('accept');
                        setCurrentState('수락');
                        alert('수락하였습니다.');
                    } else if (word === 'refuse') {
                        setChange('refuse');
                        setCurrentState('거절');
                        alert('거절하였습니다.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <Menu as="div" className="relative inline-block text-left ml-1">
            <div>
                <Menu.Button
                    className={`inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm text-gray-700 ${
                        change === 'accept' && 'text-green-700'
                    } ${change === 'refuse' && 'text-red-700'}`}
                    disabled={change !== ''}
                >
                    {currentState}
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
                                <button
                                    type="button"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-red-600',
                                        'block w-full px-4 py-2 text-left text-sm font-normal'
                                    )}
                                    onClick={() => changeState('refuse')}
                                >
                                    거절
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
                                            : 'text-green-600',
                                        'block w-full px-4 py-2 text-left text-sm font-normal'
                                    )}
                                    onClick={() => changeState('accept')}
                                >
                                    수락
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
