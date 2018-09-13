package utils;

import java.net.InetAddress;
import java.net.UnknownHostException;


public class Utilities
{
  private static short[] clientID = null;
  private static long bootTime;
  private static long counter = 0x00000000;

  static
  {
    bootTime = System.currentTimeMillis();
  }

  public static short[] generateGUID()
  {
    // TODO clean this up
    short[] data = new short[16];
    int arrayIndex = 15;
    for (int i = 0; i < 8; i++)
    {
       // Mask to process one byte at a time
       long mask = 0X00000000000000FF;

       // Adjust the mask to look at the appropriate byte
       mask = mask << (8 * i);


       long result = bootTime & mask;

       // Move the byte we interested in to the low order
       result = result >> (8 * i );

       // copy the processed byte
       data[arrayIndex--] = (short)result;

    }

    counter++;
    arrayIndex = 7;
    for (int i = 0; i < 8; i++)
    {
      long mask = 0X00000000000000FF;
      mask = mask << (8 * i);
      long result = counter & mask;

      result = result >> (8 * i );
      data[arrayIndex--] = (short)result;

    }

    return data;

  }

  /**
   *  Generate something resembling a guid for this host
   *
   *
   */
  public static short[] getClientIdentifier()
  {
    if ( null == clientID )
    {
      clientID = new short[16];
      short[] address = getHostAddress();

      int addressIndex = 0;
      for (int i = 0; i < clientID.length; i++)
      {
        if ( addressIndex == address.length )
        {
          addressIndex = 0;
        }

        clientID[i] = address[addressIndex++];
      }

      StringBuffer message = new StringBuffer();
      message.append("Client GUID: ");

      for (int i = 0; i < clientID.length; i++)
      {
        message.append( "[" +
                        Integer.toHexString( clientID[i]) +
                        "]");
      }
    }

    return clientID;
  }

  /**
   *  Returns the client guid in the form of the wrapper GUID
   *
   */
  public static GUID getClientGUID()
  {
    return new GUID(getClientIdentifier());
  }

  /**
   *  Gets the host address, works around byte[] getAddress()
   *  looking negative
   *
   *  @return address
   */
  static short[] getHostAddress()
  {
    short[] address = new short[4];
    try
    {
      InetAddress netAddress = InetAddress.getLocalHost();
      String ipAddress = netAddress.getHostAddress();


      int beginIndex = 0;
      int endIndex = ipAddress.indexOf('.');

      address[0] = (short)Integer.parseInt(ipAddress.substring(beginIndex, endIndex));

      beginIndex = endIndex + 1;
      endIndex = ipAddress.indexOf('.', beginIndex);

      address[1] = (short)Integer.parseInt(ipAddress.substring(beginIndex, endIndex));

      beginIndex = endIndex + 1;
      endIndex = ipAddress.indexOf('.', beginIndex);

      address[2] = (short)Integer.parseInt(ipAddress.substring(beginIndex, endIndex));

      beginIndex = endIndex + 1;

      address[3] = (short)Integer.parseInt(ipAddress.substring(beginIndex, ipAddress.length()));
    }
    catch (UnknownHostException e)
    {
    	e.printStackTrace();
    }

    return address;
  }

  // test
  public static void main(String[] args)
  {
    short[] guid = Utilities.generateGUID();


    System.out.println("GUID: ");
    for ( int i = 0; i < guid.length; i++)
    {

      System.out.println(Integer.toHexString(guid[i]));
    }
  }
}
