import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from 'react-icons/md';
import { Button } from '../../components/atoms';
import { DropDownItem } from '../../components/atoms/DropDownItem/DropDownItem';
import { Input } from '../../components/atoms/Inputs/Input/Input';
import { Separator } from '../../components/atoms/Separator/Separator';
import { DropDownMenu } from '../../components/organisms/DropDownMenu/DropDownMenu';
import { DropFile } from '../../components/molecules/DropFile/DropFile';
import SignUpForm from '../../components/molecules/SignUpForm/SignUpForm';
import { createOfferStore } from '../../stores';
import { MainTemplate } from '../../templates';
import { CreateOfferDetails, CreateOfferTitle, CreateOfferUploadButton, CreateOfferWrapper } from './CreateOfferStyle';
import H1 from '../../components/atoms/H1/H1';
import { DropDownMenuPopUp, DropDownMenuPopUpItem, DropDownMenuPopUpOptions, DropDownMenuPopUpTitle, DropDownMenuWrapper, DropDownMenuWrapperTitle } from '../../components/organisms/DropDownMenu/DropDownMenuStyle';

export const CreateOffer = observer(() => {
  const {
    data,
    fetchData,
    isPopUpActive,
    popUpType,
    popUpDepth,
    togglePopUp,
    setPopUpType,
    setPopUpDepth,
    menuPath,
    addPathToMenu,
    resetMenuPath,
    category,
    setCategory,
    brand,
    setBrand,
    size,
    setSize,
    color,
    setColor,
    setPrice,
    setDeposit,
    images,
    setImages,
    selectedImage,
    setSelectedImage
  } = createOfferStore;

  useEffect(() => {
    fetchData();
  }, []);

  const getContent = (key: string): string => {
    switch (key) {
      case 'category':
        return category ? category : 'Wybierz kategorię';
      case 'color':
        return color ? color : 'Wybierz kolor';
      case 'brand':
        return brand ? brand : 'Wybierz markę';
      case 'size':
        return size ? size : 'Wybierz rozmiar';
    }
  };

  const renderOfferDetails = (): JSX.Element | JSX.Element[] => {
    return <>
      { Object.entries(data).map(([key, value]) =>
        <>
          <CreateOfferTitle>
            <H1>{ key.charAt(0).toUpperCase() + key.slice(1) }</H1>
            <DropDownMenu
              content={ getContent(key) }
              id={ key }
              key={ key }
              togglePopUp={ togglePopUp }
              setPopUpType={ setPopUpType }
            />
          </CreateOfferTitle>
          <Separator/>
        </>
      ) }
    </>;
  };

  const renderOfferPopUpCategories = (): JSX.Element | JSX.Element[] => {
    let obj = data[popUpType] || {};

    for (let i = 0; i < menuPath.length; i++) {
      if (typeof obj !== 'string') {
        obj = obj[menuPath[i]];
      }
    }

    return <>
      { Object.entries(obj).map(([key, value]) =>
        <>
          <DropDownMenuPopUpItem onClick={ () => {
            console.log(key, value, typeof value);
            if (typeof value !== 'string') {
              addPathToMenu(key);
            }

            if (typeof value === 'string') {
              console.log('here', key);
              switch (popUpType) {
                case 'category':
                  setCategory(key);
                  break;
                case 'color':
                  setColor(key);
                  break;
                case 'brand':
                  setBrand(key);
                  break;
                case 'size':
                  setSize(key);
                  break;
              }

              togglePopUp();
              resetMenuPath();
            }
          } }>
            <DropDownItem content={ key }/>
            { typeof value !== 'string' && <MdNavigateNext size={ 30 }/> }
          </DropDownMenuPopUpItem>
          <Separator/>
        </>
      ) }
    </>;
  };

  return (
    <MainTemplate>
      <CreateOfferWrapper>
        <H1>UTWÓRZ OFERTĘ</H1>
        {/*<CreateOfferUploadButton>*/ }
        <DropFile images={ images } setImages={ setImages } selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
        {/*</CreateOfferUploadButton>*/ }
        <CreateOfferDetails>
          { renderOfferDetails() }

          <CreateOfferTitle style={ { display: 'inherit' } }>
            <H1>Cena za dobę wypożyczenia</H1>
            <Input onChange={ (event) => setPrice(~~event.target.value) } placeholder={ 'Wpisz cenę' } type={ 'number' }
                   min={ '0.01' } step={ '0.01' } label={ 'zł' }/>
          </CreateOfferTitle>
          {/*<Separator/>*/ }

          <CreateOfferTitle style={ { display: 'inherit' } }>
            <H1>Kaucja</H1>
            <Input onChange={ (event) => setDeposit(~~event.target.value) } placeholder={ 'Wpisz cenę' }
                   type={ 'number' } min={ '0.01' } step={ '0.01' } label={ 'zł' }/>
          </CreateOfferTitle>
        </CreateOfferDetails>

        <DropDownMenuPopUp isActive={ isPopUpActive }>
          <DropDownMenuPopUpTitle>
            { menuPath.length ? <MdNavigateBefore size={ 30 } onClick={ resetMenuPath }/> :
              <div style={ { width: '30px' } }/> }
            <H1>{ popUpType.toUpperCase().charAt(0) + popUpType.toLowerCase().slice(1) }</H1>
            <MdOutlineClose size={ 30 } onClick={ () => {
              togglePopUp();
              resetMenuPath();
            } } style={ { cursor: 'pointer' } }/>
          </DropDownMenuPopUpTitle>

          <DropDownMenuPopUpOptions>
            { renderOfferPopUpCategories() }
          </DropDownMenuPopUpOptions>

          {/*<Button content={ 'Wybierz' } customStyle={ { marginBottom: '20px', height: '50px', width: '75%' } }/>*/ }

        </DropDownMenuPopUp>


        <Button content={ 'Utwórz' } customStyle={ { width: '60%', height: '50px', marginBottom: '30px' } }></Button>
      </CreateOfferWrapper>
    </MainTemplate>
  );
});
