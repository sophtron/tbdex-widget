/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { Header, Input } from '@/components';
import allBanks from '@/data/banks';

interface Props {
  navigation: any;
  route?: any;
}

const BankListScreen: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = React.useState({
    q: '',
    banks: [] as any,
  });

  const { q, banks } = state;

  React.useEffect(() => {
    const banksFiltered = allBanks.filter((keyword) =>
      keyword.name.toLowerCase().includes(q)
    );
    setState({ ...state, banks: banksFiltered });
  }, [q]);

  return (
    <div className="h-full justify-between bg-white">
      <Header image="https://derrint.sirv.com/Images/sophtron/logos/Sophtron.png" />

      <div className="flex-1 grow p-5 py-0">
        <div className="mb-3 text-lg font-semibold text-black">
          Select Bank to Connect
        </div>

        <Input
          placeholder="Search Bank"
          value={q}
          onChange={(text: string) => setState({ ...state, q: text })}
          icon={<AiOutlineSearch size={20} color="#222222" />}
        />

        {banks.map((bank: any) => (
          <button
            key={bank.id}
            className={`flex flex-row items-center border-b border-[#E7E7E7] p-4`}
            onClick={() => {
              navigation.navigate('BankLogin', {
                bank,
              });
            }}
          >
            <div className="w-4/12">
              <img src={bank.image} className="h-10 w-auto" alt="" />
            </div>
            <div className="w-8/12 pl-2">
              <div className="font-sans text-base text-tertiary">
                {bank.name}
              </div>
            </div>
          </button>
        ))}
        {banks.length === 0 && (
          <div className="my-5 items-center">
            <img
              src="https://derrint.sirv.com/Images/sophtron/illustration-not-found.png"
              className="my-5 h-48 w-full"
              alt=""
            />
            <div className="my-4 text-center font-sans text-lg font-bold">
              Bank/Institution Not Found
            </div>
            <div className="text-center font-sans text-base leading-9 text-secondary">
              Currently we don&apos;t have that institution.{'\n'}Please try
              with another keyword.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankListScreen;
