import Wrapper from "@/components/wrapper";
import CheckoutSteps from "@/components/Stepper";



export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full md:py-20">
      <CheckoutSteps activeStep={0} />
      <Wrapper className="wrapper-class">{children}</Wrapper>
    </div>
  );
}
