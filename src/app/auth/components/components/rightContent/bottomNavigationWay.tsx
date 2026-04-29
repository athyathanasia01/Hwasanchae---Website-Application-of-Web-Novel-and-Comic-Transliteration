// technical
import Link from "next/link";

// components
import ButtonContent from "./buttonContent";

// style
import style from "../styles/rightContent/BottomNavigationWay.module.scss";

type Props = {
    context: string;
    textButton: string;
    handleOnPressGoogle?: () => void;
    textSignRef: string;
    linkRef: string;
}

export default function BottomNavigationWay({ context, textButton, handleOnPressGoogle, textSignRef, linkRef }: Props) {
    return (
        <div className={style.bottomNavigationWay}>
            <ButtonContent 
                textButton={textButton}
            />
            {context === 'login' && handleOnPressGoogle &&
                <button className={style.bottomNavigationWay__buttonGoogle} type="button" onClick={handleOnPressGoogle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" id="Google-Icon--Streamline-Svg-Logos" height="18" width="18">
                        <desc>
                            Google Icon Streamline Icon: https://streamlinehq.com
                        </desc>
                        <path fill="#4285f4" d="M17.636325 9.195825000000001c0 -0.724575 -0.0588 -1.253325 -0.1860375 -1.80165H9.176324999999999v3.270375h4.856625c-0.097875 0.8127375 -0.626625 2.0366999999999997 -1.80165 2.8591499999999996l-0.0164625 0.10949999999999999 2.6160750000000004 2.02663125 0.1812375 0.01809375c1.6645499999999998 -1.5373125 2.624175 -3.7992 2.624175 -6.482099999999999Z" strokeWidth="0.1875"></path>
                        <path fill="#34a853" d="M9.17623125 17.8125c2.3793375 0 4.3768125 -0.7833749999999999 5.835825 -2.134575L12.23120625 13.523718749999999c-0.74415 0.5189625 -1.742925 0.8812500000000001 -3.0549749999999998 0.8812500000000001 -2.3304 0 -4.3083 -1.53725625 -5.013375 -3.6620437499999996l-0.10333125000000001 0.008775L1.339284375 12.8569125l-0.035574375000000005 0.09888749999999999C2.7528562500000002 15.834543750000002 5.72953125 17.8125 9.17623125 17.8125Z" strokeWidth="0.1875"></path>
                        <path fill="#fbbc05" d="M4.16296875 10.742925c-0.18605624999999998 -0.548325 -0.29371875000000003 -1.135875 -0.29371875000000003 -1.742925 0 -0.607125 0.10768125 -1.1945999999999999 0.28393124999999997 -1.742925l-0.00493125 -0.116775L1.39392375 5.0012625l-0.09011625 0.0428625C0.706543125 6.2387250000000005 0.363830625 7.5802125 0.363830625 9c0 1.4197875 0.34271250000000003 2.7612 0.9399768749999999 3.9558l2.85916125 -2.212875Z" strokeWidth="0.1875"></path>
                        <path fill="#eb4335" d="M9.17623125 3.5949750000000003c1.6547625 0 2.7709875000000004 0.7147874999999999 3.4074750000000003 1.312125L15.07078125 2.4787500000000002C13.54333125 1.0589625 11.555568749999999 0.1875 9.17623125 0.1875 5.72953125 0.1875 2.7528562500000002 2.1654 1.3037100000000001 5.044125L4.15306875 7.257075c0.7148625000000001 -2.1247875 2.6927624999999997 -3.6620999999999997 5.0231625 -3.6620999999999997Z" strokeWidth="0.1875"></path>
                    </svg>
                    <span className={style.bottomNavigationWay__buttonGoogle__text}>Login with Google</span>
                </button>
            }
            <span className={style.bottomNavigationWay__toRegister}>
                {textSignRef}
                <Link href={linkRef} className={style.bottomNavigationWay__toRegister__link}>
                    here!
                </Link>
            </span>
        </div>
    )
}